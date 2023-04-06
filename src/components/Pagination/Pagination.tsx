import { useMemo } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = useMemo(() => (
    getNumbers(1, Math.ceil(total / perPage))),
  [total, perPage]);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            onPageChange(prevPage => {
              if (prevPage === 1) {
                return 1;
              }

              return prevPage - 1;
            });
          }}
        >
          «
        </a>
      </li>
      {pages.map(pageNumber => (
        <li
          className={classNames('page-item', {
            active: currentPage === pageNumber,
          })}
          key={pageNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === pages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={() => {
            onPageChange(prevPage => {
              if (prevPage === pages.length) {
                return pages.length;
              }

              return prevPage + 1;
            });
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
