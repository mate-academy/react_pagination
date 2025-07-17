import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [pageActive, setPageActive] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(9);
  const arrayNumberOfPage: number[] = [];
  const end = Math.min(itemsPerPage * pageActive, items.length);
  const start = itemsPerPage * (pageActive - 1) + 1;

  for (let i = 1; i <= numberOfPages; i++) {
    arrayNumberOfPage.push(Number(i));
  }

  function handlePerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newItemsPerPage = Number(event.target.value);

    setItemsPerPage(newItemsPerPage);
    setNumberOfPages(Math.ceil(42 / newItemsPerPage));
  }

  return (
    <>
      <Pagination
        pageActive={pageActive}
        start={start}
        end={end}
        handlePerPageChange={handlePerPageChange}
        arrayNumberOfPage={arrayNumberOfPage}
        setPageActive={setPageActive}
        numberOfPages={numberOfPages}
        items={items}
      />
    </>
  );
};

export default App;
