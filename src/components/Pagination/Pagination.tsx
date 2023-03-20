import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  total: string[],
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
  const countPages = Math.ceil(total.length / perPage);
  const pages = Array.from(Array(countPages), (_, index) => index + 1);
  const visiblePages
  = total.slice((currentPage - 1) * perPage, perPage * currentPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === countPages;

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: firstPage },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={firstPage}
            onClick={() => onPageChange(firstPage
              ? currentPage
              : currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={classNames('page-item',
              { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          { disabled: lastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={lastPage}
            onClick={() => onPageChange(lastPage
              ? currentPage
              : currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visiblePages.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
