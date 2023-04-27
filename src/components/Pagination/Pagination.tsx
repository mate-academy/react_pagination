import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination:FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesQuantity = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesQuantity);

  const firstPage = currentPage === 1;
  const lastItem = currentPage === pages.length;

  const handleIncrease = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleDecrease = () => {
    if (currentPage < pages.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames({ 'page-item disabled': firstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={handleIncrease}
        >
          «
        </a>
      </li>

      {pages.map(page => {
        const isPageSelected = currentPage === page;

        return (
          <li
            className={classNames({ 'page-item active': isPageSelected })}
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
        );
      })}

      <li className={classNames({ 'page-item disabled': lastItem })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastItem}
          onClick={handleDecrease}
        >
          »
        </a>
      </li>
    </ul>
  );
};
