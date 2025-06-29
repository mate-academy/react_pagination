import { Dispatch, SetStateAction } from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageAmount = Math.ceil(total / perPage);

  const handlePageClick = (page: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    onPageChange(page);
  };

  const handlePageBefore = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage < pageAmount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePageBefore}
        >
          «
        </a>
      </li>
      {getNumbers(1, pageAmount).map(pageLink => (
        <li
          className={cn('page-item', { active: pageLink === currentPage })}
          key={pageLink}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageLink}`}
            onClick={handlePageClick(pageLink)}
          >
            {pageLink}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === pageAmount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageAmount}
          onClick={handlePageNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
