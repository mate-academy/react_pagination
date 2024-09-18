import React from 'react';
import { getNumbers } from '../../utils';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNum: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxNumPages = Math.ceil(total / perPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = getNumbers(
    (currentPage - 1) * perPage + 1,
    currentPage * perPage < total ? currentPage * perPage : total,
  ).map((n: number) => `Item ${n}`);
  const links = getNumbers(1, maxNumPages).map((n: number) => n);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={`${currentPage === 1 ? 'true' : 'false'}`}
            onClick={event => {
              event.preventDefault();
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {links.map(num => (
          <li
            className={classNames('page-item', { active: currentPage === num })}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={event => {
                event.preventDefault();
                if (currentPage !== num) {
                  onPageChange(num);
                }
              }}
            >
              {num}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === maxNumPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={`${currentPage === maxNumPages ? 'true' : 'false'}`}
            onClick={event => {
              event.preventDefault();
              if (currentPage !== maxNumPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item: string) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
