import React from 'react';
import classNames from 'classnames';
import { getNumbers } from './../../utils';

type Props = {
  perPage: number;
  total: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  currentPage,
  onPageChange = () => {},
}) => {
  const fromNum: number = perPage * currentPage - (perPage - 1);
  const toNum: number = fromNum + perPage - 1;
  const lastPage = Math.ceil(total / perPage);
  const amountOfPages = getNumbers(1, total);
  const items = getNumbers(1, total);
  const activePage = currentPage;

  if (total) {
  }

  return (
    <React.Fragment>
      <ul className="pagination">
        <li
          className={classNames('page-item ', {
            disabled: activePage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={activePage === 1 && 'true'}
            onClick={() => {
              if (activePage === 1) {
                return;
              } else {
                onPageChange(activePage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {amountOfPages.slice(0, lastPage).map(elem => {
          return (
            <li
              className={classNames('page-item ', {
                active: activePage === elem,
              })}
              key={elem}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${elem}`}
                onClick={() => onPageChange(elem)}
              >
                {elem}
              </a>
            </li>
          );
        })}
        <li
          className={classNames('page-item ', {
            disabled: activePage === lastPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={activePage === lastPage && 'true'}
            onClick={() => {
              if (activePage === lastPage) {
                return;
              } else {
                onPageChange(activePage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(fromNum - 1, toNum).map(item => {
          return (
            <li data-cy="item" key={item}>
              {`Item ${item}`}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
