import React from 'react';
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
    selected: null,
  }

  async componentDidMount() {
    const images = await getContent();

    this.setState({
      images,
    });
  }

  handleSelect = (id) => {
    this.setState({
      selected: id,
    });
  }

  render() {
    const { images, selected } = this.state;

    return (
      <div className="App">

        <Pagination
          key={images.id}
          images={images}
          selected={selected}
          handleSelect={this.handleSelect}
        />
      </div>
    );
  }
}

export default App;
