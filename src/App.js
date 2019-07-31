import React from 'react';
import './App.css';
import getPlanes from './API_Data';
import ItemsPerPage from './components/ItemsPerPage';
import Pagination from './components/Pagination';

const getPageNumber = (elementsPerPage, elementsNumber) => {
  const pageNumber = Math.ceil(elementsNumber / elementsPerPage);

  return pageNumber;
};

const getFilteredPerPage = (flights, page, perPage) => {
  const filteredFlights = flights.filter((flight, index) => (
    (index >= ((page - 1) * perPage)) && (index < (page * perPage))
  ));

  return filteredFlights;
};

const getButtonsNumbers = (pageNumber) => {
  let buttons = [];
  let count = 1;

  while (count <= pageNumber) {
    buttons = [...buttons, count];

    count += 1;
  }

  return buttons;
};

class App extends React.Component {
  state = {
    arrivals: [],
    perPage: 20,
    page: 1,
  };

  async componentDidMount() {
    const temp = await getPlanes();

    this.setState({
      arrivals: temp.body.arrival,
    });
  }

  handlePageButtons = (event) => {
    const { name } = event.target;

    this.setState({ page: +name });
  }

  handleFlipButton = (event) => {
    const { name } = event.target;
    const { page, perPage, arrivals } = this.state;
    const pageNumber = getPageNumber(perPage, arrivals.length);

    if (name === 'next' && page < pageNumber) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    }

    if (name === 'back' && page > 1) {
      this.setState(prevState => ({
        page: prevState.page - 1,
      }));
    }
  }

  onPerPageChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      page: 1,
    });
  }

  render() {
    const { page, perPage, arrivals } = this.state;

    const filteredPages = getFilteredPerPage(arrivals, page, perPage);
    const pageNumber = getPageNumber(perPage, arrivals.length);
    const buttonsNumbers = getButtonsNumbers(pageNumber);
    const getNumbersShownPages = `
      ${(page * perPage) - perPage + 1}
      - ${(page * perPage) - perPage + filteredPages.length}
    `;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>{arrivals.length} Flights</h1>

        <h3>
          number Of Pages
          {pageNumber}
        </h3>

        <ItemsPerPage
          perPage={perPage}
          onPerPageChange={this.onPerPageChange}
        />

        <p>
          Shown
          {getNumbersShownPages}
          {' '}
          from
          {arrivals.length}
        </p>

        <ul>
          {filteredPages.map(arrival => (
            <li key={arrival.ID}>{arrival.airline.en.name}</li>
          ))}
        </ul>

        <Pagination
          handleFlipButton={this.handleFlipButton}
          handlePageButtons={this.handlePageButtons}
          page={page}
          pageNumber={pageNumber}
          buttonsNumbers={buttonsNumbers}
        />
      </div>
    );
  }
}

export default App;
