import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

type TypeOfState = {
  PageChange: string;
  CurrentPage: number;
};

enum SelectFields {
  colomns3 = '3',
  colomns5 = '5',
  colomns10 = '10',
  colomns20 = '20',
}

function PrepearedItems(
  oldItems: string[],
  { PageChange, CurrentPage }: TypeOfState,
) {
  let prepearedItems: string[] = [...oldItems];

  if (CurrentPage) {
    const extraElements = (CurrentPage - 1) * Number(PageChange);

    prepearedItems = prepearedItems.slice(extraElements);
  }

  switch (PageChange) {
    case SelectFields.colomns3:
      return prepearedItems.slice(0, 3);
    case SelectFields.colomns5:
      return prepearedItems.slice(0, 5);
    case SelectFields.colomns10:
      return prepearedItems.slice(0, 10);
    case SelectFields.colomns20:
      return prepearedItems.slice(0, 20);

    default:
      return prepearedItems;
  }
}

export const App: React.FC = () => {
  const [PageChange, onPageChange] = useState('5');
  const [Pages, setPages] = useState(9);
  const [CurrentPage, setCurrentPage] = useState(1);
  const visibleItems = PrepearedItems(items, {
    PageChange,
    CurrentPage,
  });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${CurrentPage} (items ` +
          `${items.indexOf(visibleItems[0]) + 1} - ` +
          `${items.indexOf(visibleItems[visibleItems.length - 1]) + 1} of ` +
          `${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={event => {
              onPageChange(event.currentTarget.value);
              setPages(
                Math.ceil(items.length / Number(event.currentTarget.value)),
              );
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        Pages={Pages}
        CurrentPage={CurrentPage}
        setCurrentPage={setCurrentPage}
        PrepearedItems={visibleItems}
      />
    </div>
  );
};

export default App;
