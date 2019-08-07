import React from 'react';
import {
  BrowserRouter, Route,
} from 'react-router-dom';
import './App.css';
import Pagination from './Paginator';

const getContent = async() => {
  const response = await fetch('https://picsum.photos/v2/list?page=2&limit=42');
  const currentContent = await response.json();

  return currentContent;
};

class App extends React.Component {
  state = {
    images: [],
    page: 0,
    perPage: 5,
    totals: 0,
  }

  async componentDidMount() {
    const images = await getContent();

    this.setState(prevState => ({
      images,
      totals: Math.ceil(images.length / prevState.perPage),
    }));
  }

  onPageChange = (currentPage) => {
    this.setState({ page: currentPage });
  };

  handleDecide = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      perPage: value,
      totals: Math.ceil(prevState.images.length / value),
    }));
  }

  render() {
    const {
      images, page, perPage, totals,
    } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <form action="/" className="adress-delivery adress-delivery__header">
            <span>images on pageg</span>
            <div
              className="destination-details"
            >
              <select
                name=""
                onClick={this.handleDecide}
                className="adress-delivery__destination-details"
              >
                <option value={5}>5</option>
                <option value={3}>3</option>
                <option value={15}>15</option>
              </select>
            </div>
          </form>

          <Route
            path="/:imgId?"
            render={({ match }) => (
              <Pagination
                key={images.id}
                images={images}
                imgId={match.params.imgId}
                page={page}
                onPageChange={this.onPageChange}
                perPage={perPage}
                totals={totals}
              />
            )}
          />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
