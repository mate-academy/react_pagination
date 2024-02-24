import React from 'react';
import { Link } from 'react-router-dom';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const currentPageMinus = currentPage === 1 ? currentPage : currentPage - 1;
  const currentPagePlus = currentPage === total ? currentPage : currentPage + 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === total;

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage && 'disabled'}`}>
          <Link
            onClick={() => onPageChange(currentPage - 1)}
            to={`?page=${currentPageMinus}&perPage=${perPage}`}
            data-cy="prevLink"
            className="page-link"
            aria-disabled={isFirstPage ? 'true' : 'false'}
          >
            «
          </Link>
        </li>
        {getNumbers(1, total).map((item, index) => {
          const isActive = currentPage === index + 1;

          return (
            <li className={`page-item ${isActive && 'active'}`} key={item}>
              <Link
                onClick={() => onPageChange(item)}
                to={`?page=${item}&perPage=${perPage}`}
                data-cy="pageLink"
                className="page-link"
              >
                {item}
              </Link>
            </li>
          );
        })}
        <li className={`page-item ${isLastPage && 'disabled'}`}>
          <Link
            onClick={() => onPageChange(currentPage + 1)}
            to={`?page=${currentPagePlus}&perPage=${perPage}`}
            data-cy="nextLink"
            className="page-link"
            aria-disabled={isLastPage ? 'true' : 'false'}
          >
            »
          </Link>
        </li>
      </ul>
    </>
  );
};
