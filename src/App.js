import React, { useState, useEffect } from 'react';
import './App.css';
import { Posts } from './components/Posts/Posts';
import { Pagination } from './components/Pagination/Pagination';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const lastPostIndex = currentPage * perPage;
  const firstPostIndex = lastPostIndex - perPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  const withInfo = () => (
    `${firstPostIndex + 1} - ${lastPostIndex} of ${posts.length}`
  );

  useEffect(() => {
    setLoading(true);
    const getData = async() => {
      await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setPosts(data));
    };

    getData();
    setLoading(false);
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const onPerPage = (event) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        onPerPage={onPerPage}
        length={posts.length}
        perPage={perPage}
        onPageChange={onPageChange}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentPage={currentPage}
        withInfo={withInfo}
      />
    </>
  );
};

export default App;
