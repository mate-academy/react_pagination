import classNames from 'classnames';
import React from 'react';

type Props = {
  current: number;
  perPage: number;
  total: number;
  onPageChange: (current: number) => void;
};

export const Pagination: React.FC<Props> = ({
  current,
  perPage,
  total,
  onPageChange,
}) => {
  const pagesTotal = Math.ceil(total / perPage);
  const numbers = Array.from({ length: pagesTotal }, (_, i) => i + 1);
  const numbersPerPage = Array.from({ length: perPage }, (_, i) => i + 1);
  const handlePageChange = (newPage: number) => {
    if (newPage !== current) {
      onPageChange(newPage);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: current === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={current === 1}
            onClick={() => handlePageChange(current - 1)}
          >
            «
          </a>
        </li>
        {numbers.map(number => (
          <li
            className={classNames('page-item', { active: current === number })}
            key={number}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`# {number}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: current === pagesTotal,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={current === pagesTotal}
            onClick={() => handlePageChange(current + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {numbersPerPage.map(number => {
          const result = number + (current - 1) * perPage;

          if (result <= 42) {
            return <li data-cy="item" key={number}>{`Item ${result}`}</li>;
          }

          return;
        })}
      </ul>
    </>
  );
};
