import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);

  const pageItems = getNumbers(1, numberOfPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

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
          aria-disabled={isFirstPage}
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pageItems.map(pageItem => (
        <li
          className={cn('page-item', {
            active: pageItem === currentPage,
          })}
          key={pageItem}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageItem}`}
            onClick={() => onPageChange(pageItem)}
          >
            {pageItem}
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
          aria-disabled={isLastPage}
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
