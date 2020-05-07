import React, { Component } from 'react';
import axios from 'axios';
import { Posts } from './components/Posts';
import { Pagination } from './components/Pagination';
import { SelectSettings } from './components/SelectSettings';
import './App.css';

class App extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        const posts = res.data;

        this.setState({ posts });
      });
  }

  changePage = ({ target }) => {
    const { currentPage } = this.state;

    if (target.id === 'prev') {
      currentPage !== 1
        ? (this.setState(state => ({
          currentPage: state.currentPage - 1,
        })))
        : (this.setState({
          currentPage: 1,
        }));
    } else if (target.id === 'next') {
      currentPage < +target.parentElement.id
        ? (this.setState(state => ({
          currentPage: state.currentPage + 1,
        })))
        : (this.setState({
          currentPage: +target.parentElement.id,
        }));
    } else {
      this.setState({
        currentPage: +target.id,
      });
    }
  }

  changeSetting = ({ target }) => {
    this.setState({
      postsPerPage: target.value,
    });
  }

  render() {
    const {
      currentPage,
      posts,
      postsPerPage,
    } = this.state;

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

    return (
      <div>
        <h1>Pagination</h1>
        <SelectSettings
          postsPerPage={postsPerPage}
          changeSetting={this.changeSetting}
        />
        <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          changePage={this.changePage}
        />
        <p>
          {firstPostIndex + 1}
          {' '}
          -
          {' '}
          {lastPostIndex}
          {' '}
          of
          {' '}
          {currentPosts.length}
        </p>
        <Posts posts={currentPosts} />
      </div>
    );
  }
}

export default App;
