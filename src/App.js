import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Pagination } from './components/Pagination';

const postFromServer = Array(42).fill(1).map((el, index) => el + index);

class App extends React.Component {
  state = {
    selectedPage: 1,
    perPage: 5,
    totalPosts: [...postFromServer],
    post: 1,
  }

  onPageChange = (event) => {
    const { textContent } = event.target;

    this.setState(state => ({
      selectedPage: +textContent,
      post: (+textContent * state.perPage) - (state.perPage - 1),
    }));
  }

  onPerPageChange = (event) => {
    const { value } = event.target;

    this.setState({
      perPage: +value,
      selectedPage: 1,
      post: 1,
    });
  }

  onNext = () => {
    this.setState(state => ({
      selectedPage: state.selectedPage + 1,
      post: state.post + state.perPage,
    }));
  }

  onPrev = () => {
    this.setState(state => ({
      selectedPage: state.selectedPage - 1,
      post: state.post - state.perPage,
    }));
  }

  addContentOnPage() {
    const { totalPosts, perPage, post } = this.state;

    return (
      <>
        {`Post ${post}-${post + (perPage - 1) < totalPosts.length
          ? post + (perPage - 1)
          : (totalPosts.length - post) + post} of ${totalPosts.length}`}
      </>
    );
  }

  render() {
    const { selectedPage, totalPosts, perPage } = this.state;

    return (
      <div className="text-center">
        <h1>
          Page
          {' '}
          {selectedPage}
          {'/'}
          {Math.ceil(totalPosts.length / perPage)}
        </h1>
        <Pagination
          {...this.state}
          onPageChange={this.onPageChange}
          onPerPageChange={this.onPerPageChange}
          onNext={this.onNext}
          onPrev={this.onPrev}
        />
        <p>
          {this.addContentOnPage()}
        </p>
      </div>
    );
  }
}

export default App;
