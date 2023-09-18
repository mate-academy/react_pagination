import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageClick = (toPage: number) => {
    if (toPage !== currentPage) {
      onPageChange(toPage);
    }
  };

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          href="#prev"
          data-cy="prevLink"
          className="page-link"
          aria-disabled={isFirstPage}
          onClick={handlePrevPageClick}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            href={`#${page}`}
            data-cy="pageLink"
            className="page-link"
            onClick={() => handlePageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          href="#next"
          data-cy="nextLink"
          className="page-link"
          aria-disabled={isLastPage}
          onClick={handleNextPageClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
