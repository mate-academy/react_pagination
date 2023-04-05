import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  totalItemsCount: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  totalItemsCount,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = getNumbers(1, Math.ceil(totalItemsCount / perPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = pagesCount.length === currentPage;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: isFirstPage,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pagesCount.map(page => (
        <li
          className={classNames(
            'page-item',
            {
              active: currentPage === page,
            },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        {
          disabled: isLastPage,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (currentPage !== pagesCount.length) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
