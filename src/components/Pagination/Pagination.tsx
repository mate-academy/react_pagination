import cn from 'classnames';
import { Page } from '../../types/page';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: Page) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const isDisabledNextBtn = currentPage === pageNumbers[pageNumbers.length - 1];
  const isDisabledPrevBtn = currentPage === pageNumbers[0];

  return (
    <ul className="pagination">
      <li
        onClick={() => !isDisabledPrevBtn && onPageChange(currentPage - 1)}
        className={cn('page-item', {
          disabled: isDisabledPrevBtn,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isDisabledPrevBtn}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li
          key={page}
          onClick={() => onPageChange(page)}
          className={cn('page-item', {
            active: currentPage === page,
          })}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        onClick={() => !isDisabledNextBtn && onPageChange(currentPage + 1)}
        className={cn('page-item', {
          disabled: isDisabledNextBtn,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isDisabledNextBtn}
        >
          »
        </a>
      </li>
    </ul>
  );
};
