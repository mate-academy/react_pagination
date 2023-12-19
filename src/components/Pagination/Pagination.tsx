import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  startItem: number;
  endItem: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange = () => {},
  startItem,
  endItem,
}) => {
  const lastPage = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {getNumbers(1, lastPage)
          .map((n:number) => (
            <li
              className={classNames(
                'page-item',
                { active: currentPage === n },
              )}
              key={n}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${n}`}
                onClick={() => {
                  onPageChange(n);
                }}
              >
                {n}
              </a>
            </li>
          ))}
        <li className={classNames(
          'page-item',
          { disabled: currentPage === lastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => {
              if (currentPage !== lastPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getNumbers(startItem, endItem)
          .map((m:number) => (
            <li
              data-cy="item"
              key={m}
            >
              {`Item ${m}`}
            </li>
          ))}
      </ul>
    </>
  );
};
