import React from 'react';
import { loadPosts, loadUsers, loadComments } from './api/API_DATA';
import './App.css';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    posts: [],
    isLoaded: false,
    isLoading: false,
    perPage: 5,
    totalPostsCount: 0,
    page: 1,
  };

  LoadData = async() => {
    this.setState({
      isLoading: true,
    });

    const users = await loadUsers();
    const posts = await loadPosts();
    const comments = await loadComments();

    const postsWithCommentsAndUsers = posts.map(post => ({
      ...post,
      comments: comments.filter(comment => post.id === comment.postId),
      user: users.find(user => user.id === post.userId),
    }));

    this.setState({
      posts: postsWithCommentsAndUsers,
      totalPostsCount: postsWithCommentsAndUsers.length,
      isLoaded: true,
      isLoading: false,
    });
  }

  setAmountPosts = (items, itemsPerPage, page) => {
    const maxValue = page * itemsPerPage;
    const AmountPosts = items.slice(maxValue - itemsPerPage, maxValue);

    return AmountPosts;
  };

  totalPages = (AmountPosts, AllPosts) => (
    AllPosts / AmountPosts
  );

  setCurrentPage = (currentPage) => {
    this.setState({
      page: currentPage,
    });
  }

  changeItemsPerPage = (pageCount) => {
    this.setState({
      perPage: pageCount,
      page: 1,
    });
  };

  render() {
    const {
      isLoaded,
      totalPostsCount,
      perPage,
      page,
      onPageGhanged,
      posts,
    } = this.state;
    const totalPages = this.totalPages(perPage, totalPostsCount);

    this.setAmountPosts(posts, perPage, page);

    if (isLoaded) {
      return (
        <section>
          <Pagination
            totalPages={totalPages}
            total={totalPostsCount}
            perPage={perPage}
            page={page}
            onPageGhanged={onPageGhanged}
            setCurrentPage={this.setCurrentPage}
            changeItemsPerPage={this.changeItemsPerPage}
          />
          <div className="App">
            <PostList
              filtredPosts={this.setAmountPosts(posts, perPage, page)}
            />
          </div>
        </section>
      );
    }

    return (
      <div className="button_load">
        <button
          className="button"
          onClick={this.LoadData}
          type="button"
          disabled={this.state.isLoading}
        >
          {this.state.isLoading ? 'Loading...' : 'Load'}
        </button>
      </div>
    );
  }
}

export default App;
