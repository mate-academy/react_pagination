import { FC, MouseEventHandler } from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const createHandleClick: (
    page: number,
  ) => MouseEventHandler<HTMLAnchorElement> = page => event => {
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={createHandleClick(currentPage - 1)}
        >
          &laquo;
        </a>
      </li>
      {getNumbers(1, lastPage).map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={createHandleClick(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={createHandleClick(currentPage + 1)}
        >
          &raquo;
        </a>
      </li>
    </ul>
  );
};
