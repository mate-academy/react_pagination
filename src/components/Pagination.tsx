import classNames from 'classnames';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  total: number;
  setPageOptions: Dispatch<SetStateAction<PageOpton>>
};

type PageOpton = {
  total: number
};

const Pagination: React.FC<Props> = ({
  total,
  setPageOptions,
}) => {
  const [items, setItems] = useState(
    Array.from({ length: total }, (_, i) => i + 1),
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const queryPerPage = searchParams.get('perPage') || 5;
  const queryPageNumber = searchParams.get('page') || 1;
  const indexOfLastPost = +queryPageNumber * +queryPerPage;
  const indexOfFirstPost = indexOfLastPost - +queryPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  function getVisiblePages() {
    const dots = '...';
    const totalPages = Array.from({
      length: Math.ceil(total / +queryPerPage),
    }, (_, i) => i + 1);

    if (totalPages.length < 5) {
      return totalPages;
    }

    const startIndex: (number | string)[] = totalPages
      .slice(0, +queryPageNumber - 1);
    const endIndex: (number | string)[] = totalPages.slice(+queryPageNumber);
    const result: (number | string)[] = [];

    if (startIndex.length > 2) {
      startIndex.splice(1, startIndex.length - 2, dots);
    }

    if (endIndex.length > 2) {
      endIndex.splice(1, endIndex.length - 2, dots);
    }

    return result.concat(startIndex, queryPageNumber, endIndex);
  }

  const visiblePages = getVisiblePages();

  useEffect(() => {
    setItems(Array.from({ length: total }, (_, i) => i + 1));
    getVisiblePages();
  }, [total]);

  useEffect(() => {
    const perPage = Math.ceil(total / +queryPerPage);

    if (queryPageNumber > perPage) {
      searchParams.set('page', perPage.toString());
      setSearchParams(searchParams);
    }
  }, [queryPerPage, total]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    const query = value;

    if (name === 'perPage') {
      setSearchParams({ perPage: query, page: queryPageNumber.toString() });
      setPageOptions(prev => (
        { ...prev, perPage: +queryPerPage }
      ));
    }

    setPageOptions(prev => (
      { ...prev, [name]: +value }
    ));
  }

  return (
    <div>
      <label htmlFor="total">Total</label>
      <input
        type="text"
        onChange={handleChange}
        value={total}
        name="total"
      />
      <label htmlFor="perPage">Items per page</label>
      <select
        name="perPage"
        id="perPage"
        value={+queryPerPage}
        onChange={handleChange}
      >
        <option value="3">
          3
        </option>
        <option value="5">
          5
        </option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      {currentPosts.map(item => (
        <ul className="list-group">
          <li key={item} className="list-group-item">{item}</li>
        </ul>
      ))}
      <ul className="pagination mt-5">
        <li className={`page-item ${+queryPageNumber - 1 < 1 ? 'disabled' : ''}`}>
          <p
            aria-hidden="true"
            className={classNames(
              'page-link',
            )}
            onClick={() => {
              setSearchParams({
                perPage: queryPerPage.toString(),
                page: (+queryPageNumber - 1).toString(),
              });
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </p>
        </li>
        {visiblePages.map(number => {
          return (
            <li
              key={number}
              className={classNames(
                'page-item clicable',
                {
                  active: +number === +queryPageNumber,
                  disabled: number === '...',
                },
              )}
            >
              <p
                aria-hidden="true"
                className={classNames(
                  'page-link',
                )}
                onClick={() => {
                  setSearchParams({
                    perPage: queryPerPage.toString(),
                    page: number.toString(),
                  });
                }}
              >
                {number}
              </p>
            </li>
          );
        })}
        <li className={`page-item ${+queryPageNumber + 1 > visiblePages.length ? 'disabled' : ''}`}>
          <p
            aria-hidden="true"
            className={classNames(
              'page-link',
            )}
            onClick={() => {
              setSearchParams({
                perPage: queryPerPage.toString(),
                page: (+queryPageNumber + 1).toString(),
              });
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </p>
        </li>

        <h2>
          {`${indexOfFirstPost + 1} - ${indexOfLastPost < total ? indexOfLastPost : total} of ${total}`}
        </h2>
      </ul>
    </div>
  );
};

export default Pagination;
