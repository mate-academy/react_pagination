import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const parseIntWithDefault = (value: string | null, defaultValue: number) =>
  value ? parseInt(value, 10) : defaultValue;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const total = items.length;
  const perPage = parseIntWithDefault(searchParams.get('perPage'), 5);
  const currentPage = parseIntWithDefault(searchParams.get('page'), 1);

  const totalPages = Math.ceil(total / perPage);
  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 0;
  const start = (safePage - 1) * perPage;
  const end = Math.min(start + perPage, total);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
    });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: '1',
      perPage: e.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {total > 0
          ? `Page ${safePage} (items ${start + 1} - ${end} of ${total})`
          : 'No items to display'}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {[3, 5, 10, 20].map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {total > 0 && (
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={safePage}
          onPageChange={handlePageChange}
        />
      )}

      {total > 0 ? (
        <ul>
          {items.slice(start, end).map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Nenhum item encontrado.</p>
      )}
    </div>
  );
};
