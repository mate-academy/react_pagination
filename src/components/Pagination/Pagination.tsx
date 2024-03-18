import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationProps = {
  perPage: number;
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  perPage,
  total,
  currentPage = 1,
  onPageChange,
}) => {
  const buttonsCount = Math.ceil(total / perPage);
  const postNumbers = getNumbers(1, buttonsCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === buttonsCount;

  const preventClickOnLastPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const preventClickOnFirstPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={preventClickOnFirstPage}
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>
      {postNumbers.map(number => (
        <li
          className={cn('page-item', { active: number === currentPage })}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          onClick={preventClickOnLastPage}
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
