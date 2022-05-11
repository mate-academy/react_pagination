import React from 'react';
import './Pagination.css';

type Props = {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (event: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
}) => {
  const totalPageCount
  = [...Array(Math.ceil(total / perPage))].map((_, i) => i + 1);

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };

  return (
    <>
      <p 
        data-cy="info"
        className="itemNumber"
      >
        {`${(perPage * page - perPage) + 1} -
        ${perPage * page > total
      ? total
      : perPage * page} of ${total}`}
      </p>
      <div className="pagination">
        <div className="page-item">
          <button
            className="btn-direction"
            type="button"
            disabled={page === 1}
            onClick={onPrevious}
          >
            Previous
          </button>
        </div>
        {totalPageCount.map(item => {
          return (
            <button
              key={item}
              className={page === item ? 'active' : 'button'}
              type="button"
              value={item}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          );
        })}
        <div className="page-item">
          <button
            className="btn-direction"
            type="button"
            disabled={page === totalPageCount.length}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
