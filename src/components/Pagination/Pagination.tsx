import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage = 1,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const hasPrev = totalPages && currentPage !== 1;
  const hasNext = totalPages && currentPage !== totalPages;

  const handleNextClick = () => {
    if (!hasNext) {
      return;
    }
    onPageChange(currentPage + 1);
  };

  const handlePrevClick = () => {
    if (!hasPrev) {
      return;
    }
    onPageChange(currentPage - 1);
  };

  const handlePageClick = (pageNum: number) => {
    if (pageNum === currentPage) {
      return;
    }
    onPageChange(pageNum);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${!hasPrev ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={`${!hasPrev}`}
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>
        {new Array(totalPages).fill(0).map((__, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${!hasNext ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={`${currentPage === totalPages}`}
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
