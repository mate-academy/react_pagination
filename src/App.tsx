import React, { useCallback, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { DropDown } from './components/DropDown/DropDown';
import { ShowItems } from './components/ShowItem/ShowItem';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [amountOfItems, setAmountOfItems] = useState('5');
  const [page, setPage] = useState('1');
  const [elements, setElements] = useState<string[]>([]);

  const handleDataFromChild = useCallback((childElements: string[]) => {
    setElements(childElements);
  }, []);

  console.log('elements:', elements);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${elements[0] || '1'} - ${elements[elements.length - 1] || '5'} of ${items.length})`}
      </p>

      <DropDown
        value={amountOfItems}
        setValue={setAmountOfItems}
        setPage={setPage}
      />
      <Pagination
        total={items.length}
        perPage={amountOfItems}
        currentPage={page}
        onPageChange={setPage}
      />

      <ShowItems
        page={page}
        items={items}
        amountOfItems={amountOfItems}
        onDataSubmit={handleDataFromChild}
      />
    </div>
  );
};

export default App;
