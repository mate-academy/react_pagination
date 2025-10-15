import React from 'react';
import cn from 'classnames';

type Props = {
  pageNum: number;
  isCurrent: boolean;
  onPageChange: (page: number) => void;
};

export const PaginationItem: React.FC<Props> = ({
  pageNum,
  isCurrent,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (!isCurrent) {
      onPageChange(page);
    }
  };

  return (
    <li className={cn('page-item', { active: isCurrent })}>
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${pageNum}`}
        onClick={() => {
          handlePageClick(pageNum);
        }}
      >
        {pageNum}
      </a>
    </li>
  );
};
