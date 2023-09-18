import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  const clickInPrevArrows = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const clickInPages = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const clickInNextArrows = () => {
    if (currentPage !== pages.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={clickInPrevArrows}
        >
          «
        </a>
      </li>
      {
        pages.map((page) => (
          <li className={currentPage === page ? 'page-item active'
            : 'page-item'}
          >
            <a
              data-cy="pageLink"
              className={page === currentPage
                ? 'page-link active' : 'page-link'}
              href={`#${page}`}
              onClick={() => clickInPages(page)}
            >
              {page}
            </a>
          </li>
        ))
      }

      <li className={currentPage === pages.length ? 'page-item disabled'
        : 'page-item'}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={clickInNextArrows}
        >
          »
        </a>
      </li>
    </ul>
  );
};
