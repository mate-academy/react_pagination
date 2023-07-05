import React, { useState, useEffect } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const selectOptions = [3, 5, 10, 20];

function itemsPerPage(perPageNum: number) {
  const resultItems: Array<string>[] = [];

  items.forEach((_item, i) => {
    return i % perPageNum === 0
      ? resultItems.push(items.slice(i, (i + perPageNum)))
      : null;
  });

  return resultItems;
}

export const App: React.FC = () => {
  const [currentPage, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [renderItems, setRenderItems] = useState<string[][]>([['']]);
  const [qntyOfCells, setQntyOfCells] = useState<number[]>([0]);

  useEffect(() => {
    setRenderItems(() => itemsPerPage(perPage));
  }, [items, perPage]);

  useEffect(() => {
    setQntyOfCells(() => getNumbers(1, renderItems.length));
  }, [renderItems, perPage]);

  const totalItems = items.length;

  const itemsFrom = currentPage * perPage - perPage + 1;
  const itemsTo = currentPage * perPage > totalItems
    ? totalItems
    : currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsFrom} - ${itemsTo} of ${totalItems})`}
      </p>

      <Select
        selectOptions={selectOptions}
        selectValue={perPage}
        setOptionPage={setPerPage}
        resetPage={setPage}
      />

      <Pagination
        total={renderItems}
        currentPage={currentPage}
        onPageChange={setPage}
        qntyOfCells={qntyOfCells}
      />
    </div>
  );
};

export default App;
