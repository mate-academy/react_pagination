import React, { useState, useEffect } from 'react';

interface Props {
  items: string[];
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  items,
}) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  useEffect(() => {
    setCurrentPageState(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(total / perPage);
  const startIndex = (currentPageState - 1) * perPage;
  const endIndex = startIndex + perPage;
  const itemsToDisplay = items.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    if (currentPageState > 1) {
      const newPage = currentPageState - 1;

      setCurrentPageState(newPage);
      onPageChange(newPage);
    }
  };

  const handleNextClick = () => {
    if (currentPageState < totalPages) {
      const newPage = currentPageState + 1;

      setCurrentPageState(newPage);
      onPageChange(newPage);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPageState(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPageState === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPageState === 1}
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${currentPageState === index + 1 ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${index + 1}`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPageState === totalPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPageState === totalPages}
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsToDisplay.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
