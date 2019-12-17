import React from 'react';
import './App.css';
import Text from './Text';
import Pagination from './Pagination';

class App extends React.Component {
  state = {
    page: 1,
    perPage: 10,
    content: ['A', 'E', 'I', 'O', 'U', 'Y', 'B', 'C',
      'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P',
      'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
  };

  onPageChange = page => (
    this.setState({ page })
  )

  render() {
    const { page, perPage, content } = this.state;
    const itemsNumber = [5, 10, 15, 20];

    return (
      <div className="App">
        <select
          className="app__select"
          onChange={event => (
            this.setState({
              page: 1,
              perPage: event.target.value,
            })
          )}
        >
          {itemsNumber.map(item => (
            <option
              value={item}
              key={item}
              selected={item === perPage}
            >
              {item}
            </option>
          ))}
        </select>
        <Text
          content={content}
          perPage={perPage}
          page={page}
        />
        <Pagination
          total={content.length}
          page={page}
          perPage={perPage}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

export default App;
