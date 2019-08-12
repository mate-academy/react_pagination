import React from 'react';
import './App.css';

import getData from './api/data';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    posts: [],
    total: 0,
    page: 1,
    perPage: 5,
  };

  async componentDidMount() {
    const data = await getData();

    this.setState(prevState => ({
      posts: data,
      total: data.length / prevState.perPage,
    }));
  }

  onPageChange = (currentPage) => {
    this.setState({ page: currentPage });
  };

  onPerPageChange = (perPage) => {
    this.setState({
      perPage,
      page: 1,
    },
    () => this.setState(prevState => (
      { total: prevState.posts.length / prevState.perPage }
    )));
  };

  render() {
    const {
      page, total, perPage, posts,
    } = this.state;

    return (
      <Pagination
        total={total}
        page={page}
        perPage={perPage}
        posts={posts}
        onPageChange={this.onPageChange}
        onPerPageChange={this.onPerPageChange}
      />
    );
  }
}

export default App;
