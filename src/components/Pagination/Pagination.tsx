import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageLinks = () => {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <li className={cn('page-item', { active: currentPage === i })} key={i}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </a>
        </li>,
      );
    }

    return links;
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            handlePrevClick();
          }}
        >
          «
        </a>
      </li>

      {renderPageLinks()}

      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={e => {
            e.preventDefault();
            handleNextClick();
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
