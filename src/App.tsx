import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import PageContent from './components/PageContent/PageContent';
import Pagination from './components/Pagination/Pagination';

const App: React.FC = () => {
  const [total] = useState(42);
  const [page] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [withInfo, setWithInfo] = useState(false);
  const navigate = useNavigate();

  const onPageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleBackButtonClick = () => {
    const prevPage = currentPage;

    if (prevPage > page) {
      setCurrentPage(state => state - 1);
    }
  };

  const handleForthButtonClick = () => {
    const prevPage = currentPage;

    if (prevPage < total) {
      setCurrentPage(state => state + 1);
    }
  };

  const onPerPageChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(page);
    navigate('/page=1');
  };

  return (
    <>
      <h1>
        Pagination
      </h1>

      <form className="SelectOptions">
        <select
          className="ChangePerPage"
          defaultValue={5}
          onChange={onPerPageChange}
        >
          <option
            value="3"
          >
            Items to display 3
          </option>
          <option
            value="5"
          >
            Items to display 5
          </option>
          <option
            value="10"
          >
            Items to display 10
          </option>
          <option
            value="20"
          >
            Items to display 20
          </option>
        </select>

        <p> Show additional info </p>

        <label>
          Yes
          <input
            name="withInfo"
            type="radio"
            value="yes"
            onChange={() => setWithInfo(true)}
          />
        </label>
        <label>
          No
          <input
            name="withInfo"
            type="radio"
            value="no"
            onChange={() => setWithInfo(false)}
            checked={!withInfo}
          />
        </label>
      </form>

      <div
        className="VersionTwo"
      >
        <Pagination
          first={page}
          last={Math.ceil(total / perPage)}
          current={currentPage}
          perPage={perPage}
          total={total}
          withInfo={withInfo}
          selectPage={onPageChange}
          moveBack={handleBackButtonClick}
          moveForth={handleForthButtonClick}
        />

        <Routes>
          <Route
            index
            element={(
              <PageContent
                total={total}
                perPage={perPage}
              />
            )}
          />
          <Route
            path="/:currentPage"
            element={(
              <PageContent
                total={total}
                perPage={perPage}
              />
            )}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
