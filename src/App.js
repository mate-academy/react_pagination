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
    perPage: 3,
  }

  async componentDidMount() {
    const images = await getContent();

    this.setState({
      images,
    });
  }

  onPageChange = (currentPage) => {
    this.setState({ page: currentPage });
  };

  render() {
    const { images, page, perPage } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
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
              />
            )}
          />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
