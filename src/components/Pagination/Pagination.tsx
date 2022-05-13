/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Pagination.scss';

type Props = {
  total: number;
  perPage?: number;
  page?: number;
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

  const paginate = (currentPage: number, lastPage: number) => {
    const delta = 1;
    const result = [];

    for (
      let i = Math.max(2, (currentPage - delta));
      i <= Math.min((lastPage - 1), (currentPage + delta));
      i += 1
    ) {
      result.push(i);
    }

    if ((currentPage - delta) > 2) {
      result.unshift('...');
    }

    if ((currentPage + delta) < (lastPage - 1)) {
      result.push('...');
    }

    result.unshift(1);
    if (lastPage !== 1) {
      result.push(lastPage);
    }

    return result.map(value => ({
      value,
      id: uuidv4(),
    }));
  };

  const visiblePages = useMemo(() => {
    return paginate(current, last);
  }, [page, total]);

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
        {`${1 + perPage * (page - 1)} - ${perPage * page > total ? `${total}` : `${perPage * page}`} of ${total}`}
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
                style={page === item.value
                  ? { backgroundColor: '#ff784f' }
                  : {}}
                onClick={() => onPageChange(+item.value)}
                className="pagination__button"
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

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
};
