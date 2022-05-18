import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { getPossiblePagesPagination }
  from '../../functions/getPossiblePagesPagination';

import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (index: number) => void;
  previousPage: () => void;
  nextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  page = 1,
  onPageChange,
  previousPage,
  nextPage,
}) => {
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setisPrevDisabled] = useState(false);

  const currentPage = page;

  const lastPage = Math.ceil(total / perPage);

  const firstShowedElement = perPage * (currentPage - 1) + 1;
  const lastShowedElement = currentPage * perPage > total
    ? total
    : currentPage * perPage;

  const displayedPages = useMemo(() => {
    return getPossiblePagesPagination(currentPage, lastPage);
  }, [total, perPage, page]);

  useEffect(() => {
    if (page > 1) {
      setisPrevDisabled(false);
    } else {
      setisPrevDisabled(true);
    }

    if (page === displayedPages[displayedPages.length - 1].value) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [page]);

  return (
    <div className="pagination">
      <h2 className="pagination__title">
        {`${firstShowedElement} - ${lastShowedElement} of ${total}`}
      </h2>
      <div className="pagination__btn-wrap">
        <button
          className="pagination__btn"
          disabled={isPrevDisabled}
          type="button"
          onClick={previousPage}
        >
          «
        </button>

        <div>
          {displayedPages.map(elem => {
            if (elem.value === '...') {
              return (
                <p
                  className="pagination__etc"
                  key={elem.key}
                >
                  {elem.value}
                </p>
              );
            }

            return (
              <button
                className={
                  classNames(
                    'pagination__btn',
                    { pagination__btn_selected: elem.value === currentPage },
                  )
                }
                key={elem.key}
                type="button"
                onClick={() => {
                  onPageChange(Number(elem.value));
                }}
              >
                {elem.value}
              </button>
            );
          })}
        </div>

        <button
          className="pagination__btn"
          disabled={isNextDisabled}
          type="button"
          onClick={nextPage}
        >
          »
        </button>
      </div>
    </div>
  );
};
