import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const perPageSelectors: number =
    total % perPage ? Math.floor(total / perPage) + 1 : total / perPage;

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {Array.from({ length: perPageSelectors }, (_, i) => i + 1).map(i => (
          <li
            key={i}
            className={classNames('page-item', { active: currentPage === i })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </a>
          </li>
        ))}

        <li
          className={classNames('page-item', {
            disabled: currentPage >= perPageSelectors,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= perPageSelectors}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
