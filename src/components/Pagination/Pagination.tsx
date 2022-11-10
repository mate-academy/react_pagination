import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total:number;
  perPage:number;
  currentPage:number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pageRender = getNumbers(1, pageCount);
  const statusPrevLink = currentPage === 1;
  const statusNextLink = currentPage === pageCount;

  const nextPageLeft = () => {
    if (!statusPrevLink) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPageRight = () => {
    if (!statusNextLink) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: statusPrevLink },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={statusPrevLink ? 'true' : 'false'}
          onClick={nextPageLeft}
        >
          «
        </a>
      </li>
      {pageRender.map(page => (
        <li
          className={classNames(
            'page-item',
            { active: currentPage === page },
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
        { disabled: statusNextLink },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={statusNextLink ? 'true' : 'false'}
          onClick={nextPageRight}
        >
          »
        </a>
      </li>
    </ul>
  );
};
