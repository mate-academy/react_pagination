import React from 'react';
import './App.scss';
import Pagination from './Pagination';
import Content from './Content';

class App extends React.Component {
  state = {
    goods: [
      'Dumplings',
      'Carrot',
      'Eggs',
      'Ice cream',
      'Apple',
      'Bread',
      'Fish',
      'Honey',
      'Jam',
      'Garlic',
      'Butter',
      'Apples',
      'Cherries',
      'Cake',
      'Sweets',
      'Chicken',
      'Oatmeal',
      'Tomatoes',
      'Pizza',
      'Pancakes',
      'Coffee',
    ],

    activePageIndex: 1,
    itemsPerPage: 5,
  };

  onPageChange = (index) => {
    this.setState({ activePageIndex: index });
  };

  render() {
    const { goods, activePageIndex, itemsPerPage } = this.state;

    return (
      <div className="App">
        <h1>Tabs</h1>
        <Pagination
          selectedPage={activePageIndex}
          handlePageChange={this.onPageChange}
          total={goods.length}
          perPage={itemsPerPage}
        />
        <Content
          selectedPage={activePageIndex}
          content={goods}
          perPage={itemsPerPage}
        />
      </div>
    );
  }
}

export default App;
