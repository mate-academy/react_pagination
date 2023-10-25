import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageNumbers
    = getNumbers(1, Math.ceil(total / perPage));
  const isFirstPage: boolean
    = currentPage === pageNumbers[0];
  const isLastPage: boolean
    = currentPage === pageNumbers[pageNumbers.length - 1];

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage ? 'true' : 'false'}
          onClick={() => isFirstPage || onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pageNumbers.map((pageNumber) => (
        <li className={cn(
          'page-item',
          { active: pageNumber === currentPage },
        )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={cn('page-item', {
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage ? 'true' : 'false'}
          onClick={() => isLastPage || onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
