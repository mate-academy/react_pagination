import React from 'react';
import cn from 'classnames';

interface Props {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = props => {
  const { page, currentPage, onPageChange } = props;

  return (
    <li className={cn('page-item', { active: currentPage === page })}>
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${page}`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </a>
    </li>
  );
};
