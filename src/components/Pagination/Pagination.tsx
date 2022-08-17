import { FC } from 'react';

type Props = {
  total: number // total number of items to paginate
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void;
};

export const Pagination:FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = Array.from(Array(pagesCount + 1).keys());

  pages.shift();

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pagesCount - 1;

  return (
    <ul className="pagination">
      <li className={`page-item ${isPrevDisabled && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${pages[currentPage - 1]}`}
          aria-disabled={isPrevDisabled}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li className={`page-item ${currentPage === page && 'active'}`}>
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

      <li className={`page-item ${isNextDisabled && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${pages[currentPage + 1]}`}
          aria-disabled={isNextDisabled}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
