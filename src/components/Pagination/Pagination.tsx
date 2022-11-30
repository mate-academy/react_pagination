import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  currentPage: number;
  total: number;
  postPerPage: number;
  onPageChange:(pageNumber: number) => void;
  setCurrentPage:Dispatch<SetStateAction<number>>;

};

export const Pagination: React.FC<Props>
= ({
  currentPage, total, postPerPage, onPageChange, setCurrentPage,
}) => {
  const pageNumbers = [];
  const disabledArea = currentPage === 1;
  const pageforLink = currentPage;

  for (let i = 1; i <= Math.ceil(total / postPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const previousPage = () => {
    setCurrentPage((current: number) => current - 1);
  };

  const nextPage = () => {
    setCurrentPage((current: number) => current + 1);
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${pageforLink}`}
          onClick={previousPage}
          aria-disabled={disabledArea}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li className={classNames('page-item', {
          active: page === currentPage,
        })}
        >
          <a
            key={page}
            data-cy="pageLink"
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames('page-item', {
        disabled: currentPage === pageNumbers.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${pageforLink}`}
          aria-disabled={disabledArea}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
