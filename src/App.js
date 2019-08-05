/* eslint-disable */
import React from 'react';
import './App.css';
import GetData from './components/GetData';
import Pagination from './components/Pagination';
import Content from './components/Content';

class App extends React.Component {
  state = {
    tabs: [],
    itemsPerPage: 5,
    page: 1,
    total: null,
  };

  async componentDidMount() {
    const data = await GetData('https://jsonplaceholder.typicode.com/posts');

    this.setState({
      tabs: data,
      total: data.length,
    });
  }

  filterTabs = (items, itemsPerPage, page) => {
    const maxValue = page * itemsPerPage;
    const filteredItems = items.slice(maxValue - itemsPerPage, maxValue);

    return filteredItems;
  };

  totalPages = (itemsPerPage, totalItems) => (
    totalItems / itemsPerPage
  );

  changePage = (pageId) => {
    this.setState({
      page: pageId,
    });
  };

  changeItemsPerPage = (pageCount) => {
    this.setState({
      itemsPerPage: pageCount,
      page: 1,
    });
  };

  render() {
    const { tabs, itemsPerPage, page, total } = this.state;
    const totalPages = this.totalPages(itemsPerPage, total);
    this.filterTabs(tabs, itemsPerPage, page);
    return (
      <div className="App">
        <Content
          tabs={this.filterTabs(tabs, itemsPerPage, page)}
        />
        <Pagination
          itemsPerPage={itemsPerPage}
          page={page}
          total={total}
          totalPages={totalPages}
          changePage={this.changePage}
          changeItemsPerPage={this.changeItemsPerPage}
        />
      </div>
    );
  }
}

export default App;
