import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getNumbers } from '../../utils';

export type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, 42);
  const [visibleItems, setVisibleItems] = useState(items);

  const pages = getNumbers(1, Math.ceil(total / perPage));

  useEffect(() => {
    setVisibleItems(items.filter(item => item <= perPage));
  }, [perPage]);

  useEffect(() => {
    setVisibleItems(items.filter(item => (
      item <= perPage * currentPage && item > perPage * (currentPage - 1)
    )));
  }, [currentPage]);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            className={classNames(
              'page-item',
              { active: page === currentPage },
            )}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`} onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === Math.ceil(total / perPage) },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item">{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
