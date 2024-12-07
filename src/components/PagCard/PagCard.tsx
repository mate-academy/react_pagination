import React from 'react';
import cn from 'classnames';
type Props = {
  good: number;
  currentPage: number;
  pageChange: (value: number) => void;
};

export const PagCard: React.FC<Props> = ({ good, currentPage, pageChange }) => (
  <li className={cn`page-item ${good === currentPage ? 'active' : ''}`}>
    <a
      data-cy="pageLink"
      className="page-link"
      href={`#${good}`}
      onClick={() => pageChange(good)}
    >
      {good}
    </a>
  </li>
);
