import React from 'react';
import './App.css';
import { getPosts } from './api/api';
import Pagination from './Pagination';

class App extends React.Component {
  state = {
    posts: [],
    current: 1,
    perPage: 5,
  };

  componentDidMount() {
    this.loadData();
  }

  onPageChange = (num) => {
    this.setState({
      current: num,
    });
  };

  setPageCountItems = (perPage) => {
    this.setState({
      perPage,
      current: 1,
    });
  };

  async loadData() {
    await getPosts()
      .then((postsData) => {
        this.setState({
          posts: postsData,
        });
      });
  }

  createPaginatedData() {
    const { current, perPage, posts } = this.state;
    const upperLimit = current * perPage;

    return posts.slice((upperLimit - perPage), upperLimit);
  }

  render() {
    const { posts, current } = this.state;

    return (
      <div className="App">
        <table>
          <thead />
          <tbody>
            {
              this.createPaginatedData().map(child => (
                <tr>
                  <td>{child.id}</td>
                  <td>{child.title}</td>
                  <td>{child.body}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <nav className="nav">
          {
            posts.length
              ? (
                <Pagination
                  total={posts.length}
                  page={current}
                  perPage={this.state.perPage}
                  changePage={this.onPageChange}
                  setPageCountItems={this.setPageCountItems}
                />
              )
              : []
          }
        </nav>
      </div>
    );
  }
}

export default App;
