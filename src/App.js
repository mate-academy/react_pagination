import React from 'react';
import './App.css';

import getPeoples from './components/peoplesData';
import Pagination from './components/Pagination';
import PeopleTable from './components/PeopleTable';

class App extends React.Component {
  state = {
    peoples: [],
    visiblePeople: [],
    pageNumbers: [],
    perPage: 5,
    page: 1,
    indexOfFirstPeople: 1,
    indexOfLastPeople: 1,
  };

  async componentDidMount() {
    const peopleData = await getPeoples();
    const { perPage, page } = this.state;
    const pageNumbers = [];

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

    const indexOfLastPeople = page * perPage;
    const indexOfFirstPeople = indexOfLastPeople - perPage;
    const currentTodos = peoples.slice(indexOfFirstPeople, indexOfLastPeople);

    for (let i = 1; i <= Math.ceil(peoples.length / perPage); i += 1) {
      pageNumbers.push(i);
    }

    this.setState({
      indexOfFirstPeople,
      indexOfLastPeople,
      peoples,
      visiblePeople: currentTodos,
      pageNumbers,
    });
  }

  handleClickPagination = (selectedPage) => {
    const { page, pageNumbers } = this.state;

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

    this.componentDidMount();
  }

  onPerPageChange = (event) => {
    this.setState({
      perPage: event.target.value,
      page: 1,
    });

    this.componentDidMount();
  }

  render() {
    const {
      peoples,
      visiblePeople,
      pageNumbers,
      page,
      indexOfFirstPeople,
      indexOfLastPeople,
    } = this.state;

    return (
      <div className="App">
        <h1 className="main-title">Pagination - React + Bootstrap</h1>
        <PeopleTable peoples={visiblePeople} />
        <div className="pagination-content">
          <select
            onChange={this.onPerPageChange}
            className="form-control"
            id="formControlSelect"
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <Pagination
            handleClickPagination={this.handleClickPagination}
            pageNumbers={pageNumbers}
            page={page}
          />
        </div>
        <div className="with-info-content">
          {indexOfFirstPeople}-{indexOfLastPeople} of {peoples.length}
        </div>
      </div>
    );
  }
}

export default App;
