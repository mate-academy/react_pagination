import React, { useEffect, useState } from 'react';
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
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const current = page;
  const last = Math.ceil(total / perPage);

  const paginate = (currentPage: number, lastPage: number) => {
    const result = [];

    for (
      let i = Math.max(2, (currentPage - 1));
      i <= Math.min((lastPage - 1), (currentPage + 1));
      i += 1
    ) {
      result.push(i);
    }

    if ((currentPage - 1) > 2) {
      result.unshift('...');
    }

    if ((currentPage + 1) < (lastPage - 1)) {
      result.push('...');
    }

    result.unshift(1);
    if (lastPage !== 1) {
      result.push(lastPage);
    }

    return result.map((value, index) => ({
      value,
      id: index + 1,
    }));
  };

  const currentPagination = paginate(current, last);

  useEffect(() => {
    if (page === currentPagination[currentPagination.length - 1].value) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }

    if (page > 1) {
      setIsPrevDisabled(false);
    } else {
      setIsPrevDisabled(true);
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
          className="pagination__buttonarrow"
        >
          &laquo;
        </button>

        <div className="pagination__buttons-pages">
          {currentPagination.map(item => {
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
                  ? {
                    backgroundColor: 'hsl(348, 100%, 61%)',
                    color: '#fff',
                  }
                  : { backgroundColor: 'hsl(171, 100%, 41%)' }}
                onClick={() => {
                  onPageChange(+item.value);
                  if (item.value === 1) {
                    setIsPrevDisabled(true);
                  } else {
                    setIsPrevDisabled(false);
                  }

                  if (item.value === last) {
                    setIsNextDisabled(true);
                  } else {
                    setIsNextDisabled(false);
                  }
                }}
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
          className="pagination__buttonarrow"
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
