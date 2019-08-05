import React from 'react';
import './App.scss';
import { getPosts } from './api/requests';

const randomstring = require('randomstring');

class List extends React.Component {
  state = {
    posts: [],
    error: null,
    isLoaded: false,
    currentPage: 0,
    postsPerPage: 10,
    pageCount: ''
  };

  async componentDidMount() {
    const postsList = await getPosts();

    try {
      this.setState(prevState => ({
        posts: postsList,
        pageCount: postsList.length / prevState.postsPerPage,
        isLoaded: true
      }));
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  changePage = pageNum => {
    this.setState({
      currentPage: pageNum
    });
  };

  changePostsPerPage = event => {
    this.setState({
      postsPerPage: event.target.value
    });
  };

  spliceList = () => {
    const { posts, currentPage, postsPerPage } = this.state;

    return posts.slice(
      currentPage * postsPerPage,
      (currentPage + 1) * postsPerPage
    );
  };

  nextPage = () => {
    this.setState(prevState => ({
      currentPage: Math.min(
        prevState.currentPage + 1,
        prevState.paginationCount - 1
      )
    }));
  };

  prevPage = () => {
    this.setState(prevState => ({
      currentPage: Math.max(prevState.currentPage - 1, 0)
    }));
  };

  render() {
    const { isLoaded, error, pageCount, posts, postsPerPage } = this.state;
    const { prevPage, nextPage, changePostsPerPage } = this;

    const postsForRender = this.spliceList();

    return (
      <div className="List">
        <h1>Simple List</h1>
        <label htmlFor="postsPerPage">
          {`Per page: `}
          <select value="10" name="postsPerPage" className="postsPerPage">
            <option name="3" id="">
              3
            </option>
            <option name="5" id="">
              5
            </option>
            <option name="10" id="">
              10
            </option>
            <option name="20" id="">
              20
            </option>
          </select>
        </label>
        <ul className="list">
          {isLoaded
            ? postsForRender.map(post => (
                <li className="list__item" key={randomstring.generate(5)}>
                  {`${post.id}.`}
                  <span className="list__item--title">{post.title}</span>
                </li>
              ))
            : error}
        </ul>
      </div>
    );
  }
}

export default List;
