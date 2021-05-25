import React from 'react';
import Pagination from './components/Pagination/Pagination';
import items from './api/items';

class App extends React.Component {
  state = {
    selectedPage: 1,
    maxCount: 5,

  };

  setSelected = (newSelPage) => {
    this.setState({ selectedPage: newSelPage });
  };

  setMaxCount = (value) => {
    this.setState({
      maxCount: value,
      selectedPage: 1,
    });
  };

  getShowItems = () => {
    const { selectedPage, maxCount } = this.state;
    const end = selectedPage * maxCount;
    const start = end - maxCount;

    return items.slice(start, end);
  }

  render() {
    const {
      selectedPage,
      maxCount,
    } = this.state;
    const itemsForShow = this.getShowItems();

    return (
      <div>
        <ul>
          {itemsForShow.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
        <Pagination
          total={items.length}
          maxCount={maxCount}
          onChangeMaxCount={this.setMaxCount}
          selectedPage={selectedPage}
          onChangeSelected={this.setSelected}
        />
      </div>
    );
  }
}

export default App;
