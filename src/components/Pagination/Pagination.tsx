/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { paginate } from '../../functions/paginate';

import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (index: number) => void;
  prevPage: () => void;
  nextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  page = 1,
  onPageChange,
  prevPage,
  nextPage,
}) => {
  const [isPrevDisabled, setPrevDisability] = useState(true);
  const [isNextDisabled, setNextDisability] = useState(false);

  const current = page;
  const last = Math.ceil(total / perPage);

  const firstElementOnPage = 1 + perPage * (page - 1);
  let lastElementOnPage = perPage * page;

  if (perPage * page > total) {
    lastElementOnPage = total;
  }

  const visiblePages = useMemo(() => {
    return paginate(current, last);
  }, [page, total, perPage]);

  useEffect(() => {
    if (page === visiblePages[visiblePages.length - 1].value) {
      setNextDisability(true);
    } else {
      setNextDisability(false);
    }

    if (page > 1) {
      setPrevDisability(false);
    } else {
      setPrevDisability(true);
    }
  }, [page]);

  return (
    <div className="pagination">
      <p className="pagination__title">
        {`${firstElementOnPage} - ${lastElementOnPage} of ${total}`}
      </p>

      <div className="pagination__buttons">
        <button
          type="button"
          onClick={prevPage}
          disabled={isPrevDisabled}
          className="pagination__button"
        >
          &laquo;
        </button>

        <div className="pagination__buttons-pages">
          {visiblePages.map(item => {
            if (item.value === '...') {
              return (
                <p
                  key={item.id}
                  className="pagination__buttons-dots"
                >
                  {item.value}
                </p>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onPageChange(+item.value)}
                className={classNames(
                  'pagination__button',
                  { 'pagination__button--selected': page === item.value },
                )}
              >
                {item.value}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={isNextDisabled}
          className="pagination__button"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};
