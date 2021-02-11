import React from 'react';
import { Pagination } from './components/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const total = 48;
const perPage = 3;

export class App extends React.Component {
  state = {
    currentPage: 1,
    array: Array.from({ length: perPage }, (_, i) => i + 1),

  }

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  }

  onNextClick = () => {
    this.setState((state) => {
      const lastIndex = state.array.length - 1;
      const lastElement = state.array[lastIndex];
      const numDisplPages = (lastElement + perPage > total)
        ? (total - lastElement)
        : perPage;

      return {
        array: Array.from({ length: numDisplPages },
          (_, i) => i + (lastElement + 1)),
        currentPage: state.array[lastIndex] + 1,
      };
    });
  }

  onPrevClick = () => {
    this.setState((state) => {
      const lastIndex = state.array.length - 1;
      const lastElement = state.array[lastIndex];
      const firstElem = state.array[0] - 1;
      const numDisplPages = (lastElement - perPage < 0) ? lastElement : perPage;

      return {
        array: (Array.from({ length: numDisplPages },
          (_, i) => firstElem - i)).reverse(),
        currentPage: state.array[lastIndex] - numDisplPages,
      };
    });
  }

  render() {
    const { currentPage, array } = this.state;

    return (
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          <Pagination
            total={total}
            perPage={perPage}
            page={currentPage}
            onPageChange={this.onPageChange}
            array={array}
            onNextClick={this.onNextClick}
            onPrevClick={this.onPrevClick}
          />
        </ul>
      </nav>
    );
  }
}
