import React from 'react';
import './App.scss';
import LoadIcon from './components/LoadIcon';
import Pagination from './components/Pagination';
import { getPosts } from './api/requests';

const randomstring = require('randomstring');

class App extends React.Component {
  state = {
    posts: [],
    error: null,
    isLoaded: false,
    currentPage: 0,
    postsPerPage: 10,
    pagesCount: ''
  };

  componentDidMount() {
    // 3ms response simulation
    setTimeout(async () => {
      const postsList = await getPosts();

      try {
        this.setState(prevState => ({
          posts: postsList,
          pagesCount: postsList.length / prevState.postsPerPage,
          isLoaded: true
        }));
      } catch (err) {
        this.setState({
          error: err
        });
      }
    }, 3000);
  }

  changePage = pageNum => {
    this.setState({
      currentPage: pageNum
    });
  };

  changePostsPerPage = event => {
    const newPostPerPage = event.target.value;

    this.setState(prevState => ({
      postsPerPage: newPostPerPage,
      pagesCount: Math.ceil(prevState.posts.length / newPostPerPage)
    }));
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
      currentPage: Math.min(prevState.currentPage + 1, prevState.pagesCount - 1)
    }));
  };

  prevPage = () => {
    this.setState(prevState => ({
      currentPage: Math.max(prevState.currentPage - 1, 0)
    }));
  };

  render() {
    const {
      isLoaded,
      error,
      pagesCount,
      currentPage,
      postsPerPage
    } = this.state;

    const postsForRender = this.spliceList();

    return (
      <div className="App">
        <div className="myApp">
          <h1>Simple List</h1>
          <label htmlFor="postsPerPage" className="postsPerPage">
            Per page:
            <select
              defaultValue="10"
              name="postsPerPage"
              onChange={this.changePostsPerPage}
            >
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
            {isLoaded ? (
              postsForRender.map(post => (
                <li className="list__item" key={randomstring.generate(5)}>
                  {`${post.id}.`}
                  <span className="list__item--title">{post.title}</span>
                </li>
              ))
            ) : (
              <LoadIcon />
            )}
          </ul>
          <Pagination
            currentPage={currentPage}
            changePage={this.changePage}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
            pagesCount={pagesCount}
            postsPerPage={postsPerPage}
          />
        </div>
      </div>
    );
  }
}

export default App;
