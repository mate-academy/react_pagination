import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async() => {
      setLoading(true);
      const response = await
      fetch('https://jsonplaceholder.typicode.com/posts');
      const getData = await response.json();

      setPosts(getData);
      setLoading(false);
    };

    fetchPosts();
  }, []);
  const handleChange = (event) => {
    setPostPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="center spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <Router>
        <h1 className="text-primary mb-3">Pagination</h1>
        <select
          className="form-control"
          onChange={handleChange}
        >
          <option value={10}>10</option>
          <option value={5}>5</option>
          <option value={3}>3</option>
        </select>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPosts={currentPosts}
          currentPage={currentPage}
        />
      </Router>
    </div>
  );
};

export default App;
