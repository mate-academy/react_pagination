import React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import getPlanes from './API_Data';
import ItemsPerPage from './components/ItemsPerPage';
import Pagination from './components/Pagination';

const getPageNumber = (elementsPerPage, elementsNumber) => {
  const pageNumber = Math.ceil(elementsNumber / elementsPerPage);

  return pageNumber;
};

const getFilteredPerPage = (flights, page, perPage) => {
  const fromIndex = (page - 1) * perPage;
  const toIndex = page * perPage;

  const filteredFlights = flights.filter((flight, index) => (
    index >= fromIndex && index < toIndex));

  return filteredFlights;
};

const getButtonsNumbers = pageNumber => (
  Array.from(Array(pageNumber), (btn, i) => i + 1));

const getNumbersShownPages = (page, perPage, filteredPages) => `
  ${(page * perPage) - perPage + 1}
  - ${(page * perPage) - perPage + filteredPages.length}
`;

class App extends React.Component {
  state = {
    arrivals: [],
    perPage: 20,
  };

  async componentDidMount() {
    const temp = await getPlanes();

    this.setState({
      arrivals: temp.body.arrival,
    });
  }

  onPerPageChange = (event) => {
    const { name, value } = event.target;

    this.props.history.push(`/${1}`);

    this.setState({
      [name]: +value,
    });
  }

  render() {
    const { perPage, arrivals } = this.state;

    const pageNumber = getPageNumber(perPage, arrivals.length);
    const buttonsNumbers = getButtonsNumbers(pageNumber);

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>{arrivals.length} Flights</h1>

        <Route
          path="/:pageId?"
          component={({ match }) => {
            const { pageId = 1 } = match.params;
            const filteredPages = getFilteredPerPage(arrivals, pageId, perPage);

            return (
              <div>
                <h3>
                  number Of Pages:
                  {pageNumber}
                </h3>

                <ItemsPerPage
                  perPage={perPage}
                  onPerPageChange={this.onPerPageChange}
                />

                <p>
                  Shown
                  {getNumbersShownPages(pageId, perPage, filteredPages)}
                  {' '}
                  from
                  {arrivals.length}
                </p>

                <ul>
                  {filteredPages.map(arrival => (
                    <li key={arrival.ID}>
                      {arrival.airline.en.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        />

        <Route
          path="/:pageId?"
          component={({ match }) => {
            const { pageId = 1 } = match.params;

            return (
              <Pagination
                pageNumber={pageNumber}
                buttonsNumbers={buttonsNumbers}
                page={+pageId}
              />
            );
          }}
        />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const AppWithRouter = withRouter(App);

export default AppWithRouter;
