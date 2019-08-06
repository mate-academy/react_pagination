import React from 'react';
import './App.css';
import shortid from 'shortid';
import Pagination from './components/Pagination';
import getCountries from './api';

const getPageNumbers = (itemsPerPage, itemsNumber) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(itemsNumber / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

class App extends React.Component {
  state = {
    countriesData: [],
    currentPage: 1,
    itemsPerPage: 5,
    pageNumbers: [],
    selectOptions: [3, 5, 10, 20],
  };

  async componentDidMount() {
    const countries = await getCountries();

    this.setState(prevState => ({
      countriesData: countries,
      countriesAmount: countries.length,
      pageNumbers: getPageNumbers(prevState.itemsPerPage, countries.length),
    }));
  }

  onPageChange = (event) => {
    const { name, id } = event.target;
    const {
      currentPage, itemsPerPage, countriesAmount, pageNumbers,
    } = this.state;

    this.setState({
      pageNumbers: getPageNumbers(itemsPerPage, countriesAmount),
    });
    if (name.toLowerCase().trim().includes('next')
      && currentPage < pageNumbers.length) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
      }));
    } else if (name.toLowerCase().trim().includes('prev') && currentPage > 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1,
      }));
    } else {
      this.setState({ currentPage: +id });
    }
  };

  onSelectChange = ({ target: { value } }) => {
    this.setState({
      itemsPerPage: +value,
      currentPage: 1,
    });
    this.setState(prevState => ({
      pageNumbers: getPageNumbers(prevState.itemsPerPage,
        prevState.countriesAmount),
    }));
  };

  render() {
    const {
      countriesData, currentPage, itemsPerPage, countriesAmount, pageNumbers,
      selectOptions,
    } = this.state;

    let indexOfLastItem = currentPage * itemsPerPage;

    indexOfLastItem = indexOfLastItem > countriesAmount
      ? countriesAmount
      : indexOfLastItem;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = countriesData.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="App">
        <div className="container pt-4 pb-4">
          <h1 className="text-center mb-4">Countries</h1>
          <form>
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label className="custom-form-control" htmlFor="formControlSelect">
              Show
              <select
                onChange={this.onSelectChange}
                id="formControlSelect"
                className="form-control mt-2 mb-2 mr-2 ml-2"
                value={itemsPerPage}
              >
                {selectOptions.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              countries
            </label>
          </form>
          <ul className="list-group mt-2 mb-4">
            {
              currentItems.map(item => (
                <li
                  key={shortid.generate()}
                  className="list-group-item"
                >
                  {item.name}
                </li>
              ))
            }
          </ul>

          <Pagination
            buttons={pageNumbers}
            currentPage={currentPage}
            withInfo={`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem}
             of ${countriesAmount} countries`}
            onPageChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
