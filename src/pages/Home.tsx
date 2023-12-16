import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import { getNumbers } from '../utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const perPageOptions = [3, 5, 10, 20];
const defaultPage = 1;
const defaultPerPage = 5;

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: String(defaultPage),
    perPage: String(defaultPerPage),
  });

  const currentPage = Number(searchParams.get('page') || defaultPage);
  const perPage = Number(searchParams.get('perPage') || defaultPerPage);

  const itemsFrom = (currentPage - 1) * perPage + 1;
  const itemsEnd = Math.min(itemsFrom + perPage - 1, items.length);

  const handleSetPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: String(defaultPage),
      perPage: String(e.target.value),
    });
  };

  const handleSetCurrentPage = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      perPage: String(perPage),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsFrom} - ${itemsEnd} of ${items.length})`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSetPerPage}
          >
            {perPageOptions.map(option => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleSetCurrentPage}
      />
      <ul>
        {items.slice(
          (currentPage - 1) * perPage,
          (currentPage - 1) * perPage + perPage,
        ).map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
