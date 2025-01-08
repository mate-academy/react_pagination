import React from 'react';

interface PaginationProps {
  total: number;
  prePage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  prePage,
  currentPage,
  onPageChange,
}) => {
  const totalPage = Math.ceil(total / prePage);

  const prevLinkHandler = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={prevLinkHandler}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPage }, (_, index) => index + 1).map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`?page=${page}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={e => {
            e.preventDefault();
            if (currentPage < totalPage) {
              onPageChange(currentPage + 1);
            }
          }}
          aria-disabled={currentPage === totalPage}
        >
          »
        </a>
        {/* <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => onPageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </a> */}
      </li>
    </ul>
  );
};
