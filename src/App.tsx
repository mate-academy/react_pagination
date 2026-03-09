import { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPages, setPerPages] = useState<number>(5);
  // eslint-disable-next-line max-len
  const countPages: number[] = getNumbers(
    1,
    Math.ceil(items.length / +perPages),
  );

  const [activePage, setActivePage] = useState<number>(1);

  const prevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const nextPage = () => {
    if (activePage < countPages.length) {
      setActivePage(prev => prev + 1);
    }
  };

  const handleChenge = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setPerPages(+event.target.value);
    setActivePage(1);
  };

  const perPageNum = +perPages;

  const startIndex = (activePage - 1) * perPageNum;
  const endIndex = startIndex + perPageNum;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${startIndex + 1} - ${Math.min(startIndex + perPageNum, items.length)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPages}
            onChange={event => handleChenge(event)}
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

      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            ' disabled ': activePage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={activePage === 1}
            onClick={prevPage}
          >
            «
          </a>
        </li>
        {countPages.map(page => {
          return (
            <li
              className={classNames('page-item', {
                active: activePage === page,
              })}
              key={page}
              onClick={() => setActivePage(page)}
            >
              <a data-cy="pageLink" className="page-link" href={`#${page}`}>
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={classNames('page-item', {
            ' disabled ': activePage === countPages.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={activePage === countPages.length}
            onClick={nextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
