import React, { useEffect, useState } from "react";
import './App.css';
import { Pagination } from "./Pagination";
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router";

const App = () => {
  const location = useLocation()
  const paramsPage = new URLSearchParams(location.search).get('page');
  const paramsPerPage = new URLSearchParams(location.search).get('perPage');
  const [perPage, setPerPage] = useState(+paramsPerPage || 5);
  const [page, setPage] = useState(+paramsPage || 1);
  const history = useHistory();

  useEffect(() => {
     history.push({
       pathname: '/react_pagination/',
       search: '?page=' + page + '&perPage=' + perPage
     });
  }, [page, perPage, paramsPerPage, paramsPage, history]);

  const handleAmountPerPage = (e) => {
    setPerPage(+e.target.value);
    setPage(1);
  }

  const handleActivePage = (e, numberPage) => {
    e.preventDefault();
    setPage(+numberPage)
  }

  const handlePrev = (e) => {
    e.preventDefault();
    setPage(page - 1)
  }

  const handleNext = (e) => {
    e.preventDefault();
    setPage(page + 1)
  }

  return (
    <div className="container">
      <h1>Pagination</h1>
      <select value={perPage} onChange={handleAmountPerPage}>
        <option value={3}>3</option>
        <option value={5} selected>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <Pagination
        total={42} /* required */
        perPage={perPage} /* optional with 5 by default */
        page={page} /* optional with 1 by default */
        handleActivePage={handleActivePage}
        nextPage={handleNext}
        prevPage={handlePrev}
      />
    </div>
  )
};

export default App;
