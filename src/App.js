import React from 'react';
import Pagination from './components/Pagination/Pagination';
import items from './api/items';

class App extends React.Component {
  state = {
    selectedPage: 1,
    itemsFromServer: items,
    itemsForShow: items.slice(0, 5),
    maxCount: 5,

  };

  setSelected = (pageNumber) => {
    this.setState(({ itemsFromServer, maxCount }) => {
      const end = pageNumber * maxCount;
      const start = end - maxCount;

      return {
        itemsForShow: itemsFromServer.slice(start, end),
        selectedPage: pageNumber,
      };
    });
  };

  setMaxCount = (value) => {
    this.setState(({ itemsFromServer }) => ({
      itemsForShow: itemsFromServer.slice(0, value),
      maxCount: value,
      selectedPage: 1,
    }));
  };

  render() {
    const {
      selectedPage,
      itemsForShow,
      maxCount,
      itemsFromServer,
    } = this.state;

    return (
      <div>
        <ul>
          {itemsForShow.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
        <Pagination
          total={itemsFromServer.length}
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
