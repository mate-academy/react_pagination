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

  onSelectChange = (value) => {
    this.setState({
      perPage: +value.target.value,
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
    const { posts, current, perPage } = this.state;

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
          <select
            onChange={this.onSelectChange}
            value={this.state.perPage}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          {
            posts.length
              ? (
                <Pagination
                  total={posts.length}
                  page={current}
                  perPage={this.state.perPage}
                  changePage={this.onPageChange}
                />
              )
              : []
          }
          <span>
            {
              `${current * perPage - perPage + 1}
             - ${current * perPage} of ${posts.length}`
            }
          </span>
        </nav>
      </div>
    );
  }
}

export default App;
