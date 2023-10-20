import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const items: { title: string, id: number }[] = getNumbers(1, 42)
  .map(n => {
    return {
      title: `Item ${n}`,
      id: n,
    };
  });

interface PagesOnPage<O> {
  totalPages: number;
  currentPage: O[];
}

enum Selects {
  Three = '3',
  Five = '5',
  Ten = '10',
  Twenty = '20',
}

const pagination = <T extends unknown>(
  elements: T[],
  itemsOnPage: number,
  selectedPage: number,
): PagesOnPage<T> => {
  const totalPages = Math.ceil(elements.length / itemsOnPage);
  const startIndex = 0 + (itemsOnPage * (selectedPage - 1));

  const currentPage = [...elements].splice(startIndex, itemsOnPage);

  const result: PagesOnPage<T> = {
    totalPages,
    currentPage,
  };

  return result;
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPage = Number(searchParams.get('page'));
  const itemsOnPage = Number(searchParams.get('perPage'));

  const { currentPage, totalPages } = pagination(
    items, itemsOnPage, selectedPage,
  );

  useEffect(() => {
    if (searchParams.get('page') === null
      || searchParams.get('perPage') === null
    ) {
      searchParams.set('page', '1');
      searchParams.set('perPage', '5');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (searchParams.get('page') !== null
      && searchParams.get('perPage') !== null
    ) {
      if (selectedPage < 0 || selectedPage > totalPages
        || !Object.values(Object(Selects)).includes(String(itemsOnPage))) {
        searchParams.set('page', '1');
        searchParams.set('perPage', '5');
        setSearchParams(searchParams);
      }
    }
  }, [searchParams, setSearchParams]);

  const firstElement = currentPage[0]?.id || 0;
  const lastElement = currentPage[currentPage.length - 1]?.id || 0;

  useEffect(() => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [itemsOnPage]);

  const onPerPageChange = (perPage: number) => {
    setSearchParams({
      page: String(selectedPage),
      perPage: String(perPage),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstElement} - ${lastElement} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={e => onPerPageChange(Number(e.target.value))}
          >
            <option value={Selects.Three}>{Selects.Three}</option>
            <option value={Selects.Five}>{Selects.Five}</option>
            <option value={Selects.Ten}>{Selects.Ten}</option>
            <option value={Selects.Twenty}>{Selects.Twenty}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      {(selectedPage && itemsOnPage)
      && (
        <Pagination
          total={items.length}
        />
      )}
      <ul>
        {currentPage.map(({ title, id }) => (
          <li data-cy="item" key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
