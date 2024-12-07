import { PagCard } from '../PagCard';
import React from 'react';
import cn from 'classnames';

type Props = {
  goods: number[];
  currentPage: number;
  pageChange: (value: number) => void;
  pagination: number;
};

export const PagList: React.FC<Props> = ({
  goods,
  currentPage,
  pagination,
  pageChange,
}) => (
  <ul className="pagination">
    <li className={cn`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled={currentPage === 1 && 'true'}
        onClick={() => currentPage !== 1 && pageChange(currentPage - 1)}
      >
        «
      </a>
    </li>
    {goods.map(good => (
      <PagCard
        good={good}
        key={good}
        pageChange={pageChange}
        currentPage={currentPage}
      />
    ))}

    <li
      className={cn`page-item ${currentPage === pagination ? 'disabled' : ''}`}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled={currentPage === pagination && 'true'}
        onClick={() =>
          currentPage !== pagination && pageChange(currentPage + 1)
        }
      >
        »
      </a>
    </li>
  </ul>
);
