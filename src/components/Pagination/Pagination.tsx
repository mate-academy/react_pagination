import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(total / perPage);
  const items = getNumbers(1, pagesCount);

  const handlePrevClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage && currentPage < pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number,
  ) => {
    event.preventDefault();

    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
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
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {items.map(n => (
        <li
          key={n}
          className={cn('page-item', {
            active: currentPage === n,
            disabled: n === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={event => handlePageClick(event, n)}
          >
            {n}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === pagesCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
