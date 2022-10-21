import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number
  onPageChange: (page: number) => void
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const maxPages = Math.ceil(total / perPage);

  const pagesList = Array(maxPages).fill(0).map((_item, index) => {
    const pageNumber = index + 1;

    return (
      <li
        key={pageNumber}
        className={classNames(
          'page-item',
          { active: pageNumber === currentPage },
        )}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${pageNumber}`}
          onClick={() => {
            onPageChange(pageNumber);
          }}
        >
          {pageNumber}
        </a>
      </li>
    );
  });

  return (
    <div>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pagesList}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === maxPages },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === maxPages ? 'true' : 'false'}
            onClick={() => {
              if (currentPage < maxPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
};
