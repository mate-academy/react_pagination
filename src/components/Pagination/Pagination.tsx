import React, { useState, useMemo, useEffect } from 'react';
import ClassNames from 'classnames';
import { nanoid } from 'nanoid';
import { listOfPages } from '../../functions/listOfPages';

import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (num: number) => void,
  nextPage: () => void,
  prevPage: () => void,
  withInfo?: boolean,
};

export const Pagination: React.FC<Props> = ({
  total,
  page,
  perPage,
  onPageChange,
  nextPage,
  prevPage,
  withInfo = false,
}) => {
  const [prevActive, setPrevActive] = useState(true);
  const [nextActive, setNextActive] = useState(true);

  const maxPage = Math.ceil(total / perPage);

  useEffect(() => {
    if (page === 1) {
      setPrevActive(false);
    } else {
      setPrevActive(true);
    }

    if (page === maxPage) {
      setNextActive(false);
    } else {
      setNextActive(true);
    }
  }, [page]);

  const prevPageHandler = () => {
    if (page - 1 > 0) {
      prevPage();
    }
  };

  const nextPageHandler = () => {
    if (page < maxPage) {
      nextPage();
    }
  };

  const pages = useMemo(() => {
    return listOfPages(page, total, perPage);
  }, [total, page, perPage]);

  const withInfoData = () => {
    const endInfo = page * perPage > total
      ? total
      : page * perPage;

    return `${perPage * (page - 1) + 1} - ${
      endInfo > total
        ? total
        : endInfo
    } of ${total}`;
  };

  return (
    <div className="pagination">
      {withInfo
        ? <span>{withInfoData()}</span>
        : ''}

      <div className="pagination__block">
        <button
          type="button"
          className="prev-btn"
          onClick={prevPageHandler}
          disabled={!prevActive}
        >
          {'<<'}
        </button>

        <ul className="pagination__list">
          {pages.map((item: number | string) => {
            if (!Number.isNaN(item)) {
              return (
                <li>
                  <button
                    type="button"
                    key={nanoid()}
                    className={ClassNames(
                      'item',
                      { item_active: item === page },
                    )}
                    onClick={() => onPageChange(+item)}
                  >
                    {item}
                  </button>
                </li>
              );
            }

            return (
              <li>
                <button
                  type="button"
                  key={nanoid()}
                  className="item"
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="next-btn"
          onClick={nextPageHandler}
          disabled={!nextActive}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};
