import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages[pages.length - 1];

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: isFirstPage },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              if (currentPage !== page) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames(
          'page-item',
          { disabled: isLastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
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
