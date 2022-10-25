import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (arg: number) => void ;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const quantityPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, quantityPages);
  const leftScroll = () => (
    (currentPage !== 1)
      ? onPageChange(currentPage - 1)
      : onPageChange(currentPage)
  );
  const rightScroll = () => (
    (currentPage !== quantityPages)
      ? onPageChange(currentPage + 1)
      : onPageChange(currentPage)
  );

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item', { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={leftScroll}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            className={classNames(
              'page-item', { active: page === currentPage },
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
          'page-item', { disabled: currentPage === quantityPages },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === quantityPages}
            onClick={rightScroll}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
