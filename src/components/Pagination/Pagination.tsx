import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pageArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, total)} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => onPerPageChange(Number(e.target.value))}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <ul className="pagination">
        <li
          data-cy="prevLink"
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={handlePrev}
        >
          <a
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>

        {pageArr.map(num => (
          <li
            key={num}
            className={cn('page-item', { active: num === currentPage })}
            onClick={() => handlePageClick(num)}
          >
            <a className="page-link" href={`#${num}`} data-cy="pageLink">
              {num}
            </a>
          </li>
        ))}

        <li
          data-cy="nextLink"
          className={cn('page-item', { disabled: currentPage === totalPages })}
          onClick={handleNext}
        >
          <a
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
