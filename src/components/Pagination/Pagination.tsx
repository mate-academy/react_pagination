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
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const generatePageLinks = () => {
    const pageLinks = [];

    for (let i = 1; i <= totalPages; i++) {
      pageLinks.push(
        <li key={i} className={cn('page-item', { active: currentPage === i })}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pageLinks;
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {generatePageLinks()}

      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
