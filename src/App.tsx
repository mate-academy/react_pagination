import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;

const getItems = (start: number, end: number): string[] => {
  const items = getNumbers(start, end).map(n => `Item ${n}`);

  return items;
};

const ItemsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);
  const initialPerPage = parseInt(queryParams.get('perPage') || '5', 10);

  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);

  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, TOTAL_ITEMS);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();

    newQueryParams.set('page', page.toString());
    newQueryParams.set('perPage', perPage.toString());

    navigate(`?page=${page}&perPage=${perPage}`);
  }, [page, perPage, navigate]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startItem} - {endItem} of {TOTAL_ITEMS})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={event => {
              setPerPage(+event.target.value);
              setPage(1);
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
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
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={page}
        onPageChange={(currentPage: number): void => {
          setPage(currentPage);
        }}
      />

      <ul>
        {getItems(startItem, endItem).map(item => {
          return (
            <li key={item} data-cy="item">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
