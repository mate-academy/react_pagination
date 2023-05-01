import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / itemsPerPage);
  const pages = getNumbers(1, Math.ceil(lastPage));

  return (
    <nav aria-label="Pagination" role="navigation">
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <button
            data-cy="prevLink"
            type="button"
            data-testid="prevButton"
            className="page-link"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <button
              data-cy="pageLink"
              type="button"
              data-testid={`pageButton-${page}`}
              className="page-link"
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === lastPage,
          })}
        >
          <button
            data-cy="nextLink"
            type="button"
            data-testid="nextButton"
            className="page-link"
            aria-disabled={currentPage === lastPage}
            onClick={() => {
              if (currentPage !== lastPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );
};
