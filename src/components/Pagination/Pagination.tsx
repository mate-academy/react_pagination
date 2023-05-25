import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  // eslint-disable-next-line react/require-default-props
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);

  const handleOnClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const prevLinkDisabled = currentPage === 1;
  const nextLinkDisabled = currentPage === numberOfPages;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: prevLinkDisabled },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevLinkDisabled}
          onClick={() => {
            if (prevLinkDisabled) {
              return;
            }

            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={handleOnClick.bind(null, page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        { disabled: nextLinkDisabled },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextLinkDisabled}
          onClick={() => {
            if (nextLinkDisabled) {
              return;
            }

            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
