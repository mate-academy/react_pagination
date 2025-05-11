import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { FormGroup } from './components/FormGroup';
import { ResultList } from './components/ResultList';
import { getInitialPages, getNumbers } from './utils';
import {
  maxAmount,
  minAmount,
  startAmountOfItems,
} from './variables/variables';

export const App: React.FC = () => {
  const initList: number[] = getNumbers(minAmount, maxAmount);
  const startList = initList.slice(0, startAmountOfItems);
  const [perPageInit, setPerPage] = useState(3);

  const initAmountOfPages: number = getInitialPages(maxAmount, perPageInit);

  const [visibleList, setVisibleList] = useState(startList);
  const [pages, setPages] = useState(initAmountOfPages);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
  }, [perPageInit]);

  const startIndex = (activePage - 1) * perPageInit + 1;
  const endIndex = Math.min(activePage * perPageInit, initList.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage} (items {startIndex} - {endIndex} of {initList.length})
      </p>

      <FormGroup
        initList={initList}
        visibleList={visibleList}
        setVisibleList={setVisibleList}
        pages={pages}
        setPages={setPages}
        perPageInit={perPageInit}
        setPerPage={setPerPage}
        activePage={activePage}
      />
      <Pagination
        pages={pages}
        setPages={setPages}
        setVisibleList={setVisibleList}
        activePage={activePage}
        setActivePage={setActivePage}
        perPageInit={perPageInit}
        initList={initList}
      />
      <ResultList visibleList={visibleList} />
    </div>
  );
};

export default App;
