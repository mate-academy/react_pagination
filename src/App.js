import React from 'react';
import './App.css';

import queryString from 'query-string';
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
  };

  async componentDidMount() {
    const temp = await getPlanes();

    this.setState({
      arrivals: temp.body.arrival,
    });
  }

  onPerPageChange = (event) => {
    const { value } = event.target;

    this.props.history.push(`/${1}?perpage=${value}`);
  }

  render() {
    const { arrivals } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>{arrivals.length} Flights</h1>

        <Route
          path="/:pageId"
          exact
          component={({ match, location }) => {
            const { pageId = 1 } = match.params;
            const { perpage = 20 } = queryString.parse(location.search);
            const perPage = +perpage;

            if (perPage < 3 || perPage > 20) {
              this.props.history.push(`/${1}?perpage=20`);
            }

            const pageNumber = getPageNumber(perPage, arrivals.length);
            const buttonsNumbers = getButtonsNumbers(pageNumber);
            const filteredPages = getFilteredPerPage(arrivals, pageId, perPage);

            if (pageId > pageNumber && pageNumber > 0) {
              this.props.history.push(`/${1}`);
            }

            return (
              <div>
                <h3>
                  number Of Pages:
                  {pageNumber}
                </h3>

                <ItemsPerPage
                  perPage={perPage}
                  onPerPageChange={this.onPerPageChange}
                  location={location}
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

                <Pagination
                  buttonsNumbers={buttonsNumbers}
                  page={+pageId}
                  perPage={perPage}
                />
              </div>
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
