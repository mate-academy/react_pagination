import React from 'react';
import { items } from '../../App';
import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const firstPage = 1;
  const finalPage = Math.ceil(total / perPage);
  const numbers = getNumbers(firstPage, finalPage);

  const handlePrevClick = () => {
    const newPage = Math.max(currentPage - 1, firstPage); // Ensure newPage doesn't go below 1

    onPageChange(newPage);
  };

  const handleNextClick = () => {
    const newPage = Math.min(currentPage + 1, finalPage); // Ensure newPage doesn't exceed finalPage

    onPageChange(newPage);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={
            currentPage === firstPage ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#"
            aria-disabled={currentPage === firstPage}
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>
        {numbers.map((item: number) => (
          <li
            key={item}
            className={currentPage === item ? 'page-item active' : 'page-item'}
            onClick={() => onPageChange(item)}
          >
            <a data-cy="pageLink" className="page-link" href="#">
              {item}
            </a>
          </li>
        ))}

        <li
          className={
            currentPage === finalPage ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#"
            aria-disabled={currentPage === finalPage}
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .slice(
            perPage * (currentPage - 1),
            Math.min(currentPage * perPage, items.length),
          )
          .map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
