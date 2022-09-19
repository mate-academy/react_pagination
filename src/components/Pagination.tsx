import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import './Pagination.css';

type Props = {
  total: number,
  perPage: number,
  page: number,
  withInfo?: boolean,
  updateSearch: (params: { [key: string]: string }) => void,
};

export const Pagination: React.FC<Props> = React.memo(({
  total, page, perPage, withInfo, updateSearch,
}) => {
  const [pagesQty, setPagesQty] = useState([1]);
  const [initialNum, setInitialNum] = useState(1);
  const [, setSearchParams] = useSearchParams();

  const getPagesQty:() => void = () => {
    const pagesArr = [];

    for (let i = 1; i <= total; i += 1) {
      pagesArr.push(i);
    }

    if (pagesArr.length > 0) {
      setPagesQty(pagesArr);
    }
  };

  const changeInitialNum:(step:number) => void = (step) => {
    if (step < 0) {
      setInitialNum((prevValue) => {
        return (prevValue + step >= 1)
          ? prevValue + step
          : 1;
      });
    } else {
      setInitialNum((prevValue) => {
        return (prevValue + step <= total - perPage + 1)
          ? prevValue + step
          : total - perPage + 1;
      });
    }
  };

  const getPath = (num: number) => {
    return { pathname: `/${num}`, search: `?page=${num}&perPage=${perPage}` };
  };

  useEffect(() => {
    getPagesQty();
  }, [total]);

  return (
    <nav className="pagePagination">
      <p
        className="pagePagination__with-info"
        hidden={!withInfo}
      >
        {`${initialNum} - ${initialNum - 1 + perPage} of ${total}`}
      </p>
      <ul className="pagePagination__list">
        <li
          className="pagePagination__item"
        >
          <button
            type="button"
            className={classNames(
              'pagePagination__link', {
                'pagePagination__link--passive': initialNum === 1,
              },
            )}
            onClick={() => changeInitialNum(0 - perPage)}
          >
            <span>&laquo;</span>
          </button>
        </li>
        {pagesQty.map(el => (
          <li
            className="pagePagination__item"
            key={el}
            hidden={el < initialNum || el >= initialNum + perPage}
          >
            <Link
              className={classNames(
                'pagePagination__link', {
                  'pagePagination__link--current': el === page,
                },
              )}
              to={getPath(el)}
              onClick={() => {
                updateSearch({ page: `${el}` });
                if ((initialNum + perPage - el) <= 1) {
                  changeInitialNum(Math.floor(perPage / 2));
                }

                if ((initialNum + perPage - el) >= perPage) {
                  changeInitialNum(-Math.floor(perPage / 2));
                }
              }}
            >
              {el}
            </Link>
          </li>
        ))}
        <li
          className="pagePagination__item"
        >
          <button
            type="button"
            className={classNames(
              'pagePagination__link', {
                'pagePagination__link--passive': (
                  initialNum + perPage > total
                ),
              },
            )}
            onClick={() => changeInitialNum(perPage)}
          >
            <span>&raquo;</span>
          </button>
        </li>
      </ul>
      <select
        name="selectPerPage"
        id="selectPerPage"
        className="pagePagination__select-perPage"
        value={perPage}
        onChange={(e) => {
          updateSearch({ perPage: e.target.value });
          setSearchParams({ perPage: e.target.value, page: `${page}` });
        }}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </nav>
  );
});
