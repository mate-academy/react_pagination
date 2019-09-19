import React from 'react';
import './App.css';

import getPeoples from './components/peoplesData';
import Pagination from './components/Pagination';
import PeopleTable from './components/PeopleTable';

class App extends React.Component {
  state = {
    peoples: [],
    perPage: 5,
    page: 1,
    indexOfFirstPeople: 1,
    indexOfLastPeople: 1,
  };

  async componentDidMount() {
    const peopleData = await getPeoples();

    const peoples = peopleData.map((person, index) => ({
      id: index + 1,
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: peopleData.filter(item => item.mother === person.name
        || item.father === person.name)
        .map(item => item.name)
        .join(', '),
    }));

    this.setState({
      peoples,
    });
  };

  handleClickPagination = (selectedPage, pageNumbers) => {
    const { page } = this.state;

    switch (selectedPage) {
      case 'previous':
        if (page > 1) {
          this.setState({
            page: page - 1,
          });
        }

        break;
      case 'next':
        if (page < pageNumbers.length) {
          this.setState({
            page: page + 1,
          });
        }

        break;
      default:
        this.setState({
          page: selectedPage,
        });
    }
  }

  onPerPageChange = (event) => {
    this.setState({
      perPage: event,
      page: 1,
    });
  }

  render() {
    const {
      peoples,
      pageNumbers,
      page,
      perPage,
    } = this.state;
    const indexOfLastPeople = page * perPage > peoples.length
      ? peoples.length
      : page * perPage;
    const indexOfFirstPeople = indexOfLastPeople - perPage;
    const currentTodos = peoples.slice(indexOfFirstPeople, indexOfLastPeople);

    return (
      <div className="App">
        <h1 className="main-title">Pagination - React + Bootstrap</h1>
        <PeopleTable peoples={currentTodos} />
        <div className="pagination-content">
          <Pagination
            peoples={peoples}
            perPage={perPage}
            handleClickPagination={this.handleClickPagination}
            page={page}
            onPerPageChange={this.onPerPageChange}
          />
        </div>
        <div className="with-info-content">
          {indexOfFirstPeople + 1}-{indexOfLastPeople} of {peoples.length}
        </div>
      </div>
    );
  }
}

export default App;
