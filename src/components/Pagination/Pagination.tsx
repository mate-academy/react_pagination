import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  perPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const getCountOfPage = (total: number) => {
    let count: number = Math.floor(total / perPage);

    if (total % perPage > 0) {
      count++;
    }

    return count;
  };

  interface Page {
    id: number;
    pageNumber: number;
  }

  const countOfPage = getCountOfPage(totalItems);
  const pages: Page[] = getNumbers(1, countOfPage).map(n => {
    return { id: n, pageNumber: n };
  });

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < countOfPage) {
      onPageChange(currentPage + 1);
    }
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
          onClick={() => handlePrevPageClick()}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page.id}
          className={cn('page-item', {
            active: page.id === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page.id}`}
            onClick={() => handlePageClick(page.id)}
          >
            {page.pageNumber}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === countOfPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countOfPage}
          onClick={() => handleNextPageClick()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
