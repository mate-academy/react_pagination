import React from 'react';
import './Pagination.css';
import { Button } from 'react-bootstrap';

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
  const totalPageCount = [...Array(Math.ceil(total / perPage))].map((_, i) => i + 1);

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };

  return (
    <>
      <p className="itemNumber">
        {`${(perPage * page - perPage) + 1} -
        ${perPage * page > total
      ? total
      : perPage * page} of ${total}`}
      </p>
      <div className="pagination">
        <div
          className="page-item"
        >
          <Button
            className="button"
            type="button"
            disabled={page === 1}
            onClick={onPrevious}
          >
            Previous
          </Button>
        </div>
        {totalPageCount.map(item => {
          return (
            <Button
              key={item}
              className="button"
              type="button"
              value={item}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          );
        })}
        <div
          className="page-item"
        >
          <Button
            className="button"
            type="button"
            disabled={page === totalPageCount.length}
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
