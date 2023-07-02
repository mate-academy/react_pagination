import { FC } from 'react';
import cn from 'classnames';
import { PaginationItem } from '../PaginationItem';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  setCurrentPage: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  setCurrentPage,
}) => {
  const pages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, pages);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleOnClick = (page: number) => {
    onPageChange(page);
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
          aria-disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>

      {pageNumbers.map(page => (
        <PaginationItem
          key={page}
          page={page}
          currentPage={currentPage}
          handleOnClick={handleOnClick}
        />
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === pageNumbers.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumbers.length}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
