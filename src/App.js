import React from 'react';

import './App.css';
import Pagination from './components/Pagination';
import List from './components/List';

const getPeople = async() => {
  const url
    = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(url);
  const people = await response.json();

  return people;
};

class App extends React.Component {
  state = {
    currentPage: 1,
    perPage: 5,
    people: [],
  };

  async componentDidMount() {
    const people = await getPeople();

    this.setState({
      people,
    });
  }

  onPerPageChange = (event) => {
    const perPage = event.target.value;

    this.setState({
      perPage,
      currentPage: 1,
    });
  };

  onPageChange = (event) => {
    const { people, perPage } = this.state;
    const btnVal = event.target.value;

    switch (btnVal) {
      case 'prev':
        if (this.state.currentPage > 1) {
          this.setState(prevState => ({
            currentPage: prevState.currentPage - 1,
          }));
        }

        break;

      case 'next':
        if (this.state.currentPage < Math.ceil(people.length / perPage)) {
          this.setState(prevState => ({
            currentPage: prevState.currentPage + 1,
          }));
        }

        break;

      default:
        this.setState({
          currentPage: +btnVal,
        });
    }
  };

  render() {
    const { currentPage, people, perPage } = this.state;

    return (
      <div className="App">
        <List people={people} page={currentPage} perPage={perPage} />
        <Pagination
          total={people.length}
          perPage={perPage}
          page={currentPage}
          handleClick={this.onPageChange}
          handleChange={this.onPerPageChange}
          withInfo
        />
      </div>
    );
  }
}

export default App;
