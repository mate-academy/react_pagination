import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.max(1, Math.ceil(total / perPage));
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= pagesCount;

  const goTo = (page: number) => {
    if (page < 1 || page > pagesCount || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  const onPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFirst) {
      goTo(currentPage - 1);
    }
  };

  const onNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLast) {
      goTo(currentPage + 1);
    }
  };

  const onPageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    goTo(page);
  };

  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst ? 'true' : 'false'}
          onClick={onPrev}
        >
          «
        </a>
      </li>

      {pageNumbers.map(n => (
        <li
          key={n}
          className={`page-item ${n === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={e => onPageClick(e, n)}
          >
            {n}
          </a>
        </li>
      ))}

      <li className={`page-item ${isLast ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast ? 'true' : 'false'}
          onClick={onNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
