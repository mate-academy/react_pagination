import React from 'react';
import cn from 'classnames';
import { PerPage } from '../../types/PerPage';

type Props = {
  total: number;
  perPage: PerPage;
  currentPage: number;
  onPageChange: (a: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPage = Math.ceil(total / +perPage);

  const pages = [];

  for (let i = 1; i <= totalPage; i += 1) {
    pages.push(i);
  }

  const handlePageChanger = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePagePrev = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageNext = () => {
    if (currentPage !== totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={handlePagePrev}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChanger(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === totalPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPage ? 'true' : 'false'}
          onClick={handlePageNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
