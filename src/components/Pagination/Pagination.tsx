/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage?: number;
  page?: number;
  withInfo?: boolean;
  onClick: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  page = 1,
  withInfo,
  onClick,
}) => {
  const numbersOfPages = Math.ceil(total / perPage);
  const pageItemsOutput
  = `${perPage * (page - 1) + 1} \
  - ${numbersOfPages === page ? total : perPage * page} \
  of ${total}`;

  const isPrevDisabled = page === 1;
  const isNextDisabled = page === numbersOfPages;

  return (
    <div className="container mt-5 px-5">
      {withInfo && (
        <p className="has-text-centered is-size-5 mb-2">
          {pageItemsOutput}
        </p>
      )}
      <nav className="pagination is-centered is-rounded">
        <button
          type="button"
          className="button pagination-previous"
          onClick={() => onClick(page - 1)}
          disabled={isPrevDisabled}
        >
          Previous
        </button>

        <button
          onClick={() => onClick(page + 1)}
          type="button"
          className="button pagination-next"
          disabled={isNextDisabled}
        >
          Next
        </button>
        <ul className="pagination-list">
          {[...Array(numbersOfPages)].map((_, i) => {
            const pageNumber = i + 1;

            return (
              <li key={pageNumber}>
                <button
                  type="button"
                  onClick={() => onClick(pageNumber)}
                  className={classNames(
                    'button pagination-link',
                    {
                      'is-current': pageNumber === page,
                    },
                  )}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
