import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './ShortPagePagination.css';

type Props = {
  total: number,
  page: number,
  perPage: number,
  updateSearch: (params: { [key: string]: string }) => void,
};

export const ShortPagePagination: React.FC<Props> = React.memo(({
  total, page, perPage, updateSearch,
}) => {
  const getPath = (num: number) => {
    return { pathname: `/${num}`, search: `?page=${num}&perPage=${perPage}` };
  };

  return (
    <nav className="shortPagePagination">
      <ul className="shortPagePagination__list">
        <li
          className="shortPagePagination__item"
        >
          <Link
            className={classNames(
              'shortPagePagination__link', {
                'shortPagePagination__link--passive': (
                  page === 1
                ),
              },
            )}
            to={getPath(page - 1)}
            onClick={() => updateSearch({ page: `${page - 1}` })}
          >
            <span>&lt;</span>
          </Link>
        </li>
        <li
          className="shortPagePagination__item"
          hidden={page < 3}
        >
          <Link
            className="shortPagePagination__link"
            to={getPath(1)}
            onClick={() => updateSearch({ page: '1' })}
          >
            1
          </Link>
        </li>
        <span
          hidden={page < 3}
          className="shortPagePagination__span"
        >
          . . .
        </span>
        <li
          className="shortPagePagination__item"
          hidden={page === 1}
        >
          <Link
            to={getPath(page - 1)}
            className="shortPagePagination__link"
            onClick={() => updateSearch({ page: `${page - 1}` })}
          >
            {page - 1}
          </Link>
        </li>
        <li
          className="shortPagePagination__item"
        >
          <span
            className={'shortPagePagination__link'
              + ' shortPagePagination__link--current'}
          >
            {`[ ${page} ]`}
          </span>
        </li>
        <li
          className="shortPagePagination__item"
          hidden={page === total}
        >
          <Link
            className="shortPagePagination__link"
            to={getPath(page + 1)}
            onClick={() => {
              updateSearch({ page: `${page + 1}` });
            }}
          >
            {page + 1}
          </Link>
        </li>
        <span
          hidden={page + 1 >= total}
          className="shortPagePagination__span"
        >
          . . .
        </span>
        <li
          className="shortPagePagination__item"
          hidden={page + 1 >= total}
        >
          <Link
            className="shortPagePagination__link"
            to={getPath(total)}
            onClick={() => updateSearch({ page: `${total}` })}
          >
            {total}
          </Link>
        </li>
        <li
          className="shortPagePagination__item"
        >
          <Link
            className={classNames(
              'shortPagePagination__link', {
                'shortPagePagination__link--passive': (
                  page === total
                ),
              },
            )}
            to={getPath(page + 1)}
            onClick={() => updateSearch({ page: `${page + 1}` })}
          >
            <span>&gt;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
});
