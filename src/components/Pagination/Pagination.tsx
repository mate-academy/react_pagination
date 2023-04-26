import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange(page: number): void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const visiblePages = getNumbers(1, Math.ceil(total / perPage));

  function handlePageChange(condition: number, page: number) {
    if (currentPage !== condition) {
      onPageChange(page);
    }
  }

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled="true"
          onClick={() => handlePageChange(1, currentPage - 1)}
        >
          «
        </a>
      </li>
      {visiblePages.map(number => (
        <li
          className={classNames(
            'page-item',
            {
              active: number === currentPage,
            },
          )}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => handlePageChange(number, number)}
          >
            {number}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === Math.ceil(total / perPage),
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled="false"
          onClick={() => (
            handlePageChange(Math.ceil(total / perPage), currentPage + 1)
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
