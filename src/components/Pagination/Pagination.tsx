import React from 'react';

type Props = {
  total: number,
  // perPage: number,
  currentPage: number,
  onPageChange: (page: number |
  ((prevCurrentPage: number) => number)) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange: setCurrentPage,
}) => {
  const handleCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage !== total) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  const disableGoToPrevious = currentPage === 1;
  const disableGoToNext = currentPage === total;

  function generateNumberArray(arrayLength: number): number[] {
    return Array.from({ length: arrayLength }, (_, index) => index + 1);
  }

  return (
    <ul className="pagination">
      <li
        className={`page-item ${disableGoToPrevious ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disableGoToPrevious}
          onClick={goToPreviousPage}
        >
          «
        </a>
      </li>

      {generateNumberArray(total)
        .map(page => (
          <li
            className={`page-item${currentPage === page ? ' active' : ''}`}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                handleCurrentPage(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

      <li
        className={`page-item ${disableGoToNext ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disableGoToNext}
          onClick={goToNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
