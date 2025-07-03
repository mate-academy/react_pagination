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
  const totalPages = getNumbers(1, pageAmount);

  const hendlePageBefore = (event: React.MouseEvent) => {
    event.preventDefault();

    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const hendlePageClick = (page: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    onPageChange(page);
  };

  const hendlePageNext = (event: React.MouseEvent) => {
    event.preventDefault();

    if (currentPage < totalPages.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={hendlePageBefore}
          >
            «
          </a>
        </li>
        {totalPages.map(pageLink => (
          <li
            className={cn('page-item', { active: pageLink === currentPage })}
            key={pageLink}
          >
            <a
              key={pageLink}
              data-cy="pageLink"
              className="page-link"
              href={`#${pageLink}`}
              onClick={hendlePageClick(pageLink)}
            >
              {pageLink}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === totalPages.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages.length}
            onClick={hendlePageNext}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
