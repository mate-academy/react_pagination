import React, { useMemo } from 'react';
import classNames from 'classnames';
import { GeneratePages } from '../GenereteComponents';

type Props = {
  total:number,
  perPage:number,
  currentPage:number;
  onPageChange:(pageNum:number) => void;
};

export const Pagination:React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const totalPages = useMemo(
    () => Math.ceil(total / perPage), [total, perPage],
  );

  const handlePageChange = (pageNum:number) => {
    onPageChange(pageNum);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {GeneratePages(totalPages, currentPage, handlePageChange)}
      <li
        className={
          classNames('page-item', { disabled: currentPage === totalPages })
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
