/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import './Pagination.css';

type Props = {
  total: number,
  perPage: number,
  page: number,
  withInfo?: boolean,
  onPageChange: (selectedPage:number) => void,
  changePerPage: (value:number) => void,
};

export const Pagination: React.FC<Props> = ({
  total, page, onPageChange, perPage, withInfo, changePerPage,
}) => {
  const [pagesQty, setPagesQty] = useState([1]);
  const [initialNum, setInitialNum] = useState(13);

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
          <a
            className={classNames(
              'pagePagination__link', {
                'pagePagination__link--passive': initialNum === 1,
              },
            )}
            href="#"
            onClick={() => changeInitialNum(0 - perPage)}
          >
            <span>&laquo;</span>
          </a>
        </li>
        {pagesQty.map(el => (
          <li
            className="pagePagination__item"
            key={el}
            hidden={el < initialNum || el >= initialNum + perPage}
          >
            <a
              className={classNames(
                'pagePagination__link', {
                  'pagePagination__link--current': el === page,
                },
              )}
              href="#"
              onClick={() => {
                onPageChange(el);
                if ((initialNum + perPage - el) <= 1) {
                  changeInitialNum(Math.floor(perPage / 2));
                }

                if ((initialNum + perPage - el) >= perPage) {
                  changeInitialNum(-Math.floor(perPage / 2));
                }
                //
              }}
            >
              {el}
            </a>
          </li>
        ))}
        <li
          className="pagePagination__item"
        >
          <a
            className={classNames(
              'pagePagination__link', {
                'pagePagination__link--passive': (
                  initialNum + perPage > total
                ),
              },
            )}
            href="#"
            onClick={() => changeInitialNum(perPage)}
          >
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
      <select
        name="selectPerPage"
        id="selectPerPage"
        className="pagePagination__select-perPage"
        value={perPage}
        onChange={(e) => changePerPage(+e.target.value)}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </nav>
  );
};
