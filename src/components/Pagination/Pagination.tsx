import React, { useEffect } from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const getArrayFromNum = (length: number, startValue: number = 0) => {
  return Array.from({ length: length }, (_, i) => i + startValue + 1);
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getArrayFromNum(Math.ceil(total / perPage));
  const maxItemsPerPage =
    pages.length === currentPage ? total % perPage : perPage;
  const itemsForCurrentPage = getArrayFromNum(
    maxItemsPerPage,
    (currentPage - 1) * perPage,
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    params.set('page', currentPage.toString());
    params.set('perPage', perPage.toString());

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`,
    );
  }, [currentPage, perPage]);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={`${currentPage === 1}`}
            onClick={currentPage === 1 ? undefined : onPageChange}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            className={cn('page-item', { active: page === currentPage })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={onPageChange}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === pages.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={`${currentPage === pages.length}`}
            onClick={currentPage === pages.length ? undefined : onPageChange}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsForCurrentPage.map(item => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
