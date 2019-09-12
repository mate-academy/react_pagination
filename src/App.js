import React from 'react';
import {
  Route, HashRouter,
} from 'react-router-dom';
import './App.css';
import Pagination from './Paginator';

const getContent = async() => {
  const Api = 'https://mate-academy.github.io/react_people-table/api/';
  const response = await fetch(`${Api}/people.json`);
  const currentContent = await response.json();

  return currentContent;
};

class App extends React.Component {
  state = {
    people: [],
    page: 1,
    perPage: 3,
    totals: 0,
  }

  async componentDidMount() {
    const people = await getContent();

    this.setState(prevState => ({
      people,
      page: 0,
      totals: Math.ceil(people.length / prevState.perPage),
    }));
  }

  onPageChange = (currentPage) => {
    this.setState({
      page: currentPage,
    });
  };

  handleDecide = (event) => {
    const { value } = event.target;

    if (value !== this.state.perPage) {
      this.setState(prevState => ({
        page: 0,
      }));
    }

    this.setState(prevState => ({
      perPage: value,
      totals: Math.ceil(prevState.people.length / value),
    }));
  }

  render() {
    const {
      people, page, perPage, totals,
    } = this.state;

    return (
      <HashRouter>
        <div className="App">
          <Route
            path="/:pageId?"
            render={({ match }) => (
              <Pagination
                key={people.id}
                people={people}
                pageId={match.params.pageId}
                page={page}
                onPageChange={this.onPageChange}
                perPage={perPage}
                totals={totals}
                handleDecide={this.handleDecide}
              />
            )}
          />
        </div>
      </HashRouter>

    );
  }
}

export default App;
