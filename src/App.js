import React from 'react';
import './App.css';
import Pagination from './components/Pagination';
import posts from './api/data';

class App extends React.Component {
  state = {
    totalItems: posts.length,
    perPage: 10,
    page: 1,
    withInfo: true,
  };

  onPageChange = (selectedPage) => {
    this.setState({
      page: selectedPage,
    });
  };

  render() {
    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>{posts.length} posts</h1>
        <Pagination
          total={Math.ceil(this.state.totalItems / this.state.perPage)}
          totalItems={this.state.totalItems}
          perPage={this.state.perPage}
          page={this.state.page}
          posts={posts}
          onPageChange={this.onPageChange}
          withInfo={this.state.withInfo}
          showFrom={this.state.perPage * (this.state.page - 1) + 1}
          showTo={(this.state.perPage * this.state.page)}
        />
      </div>
    );
  }
};

export default App;
