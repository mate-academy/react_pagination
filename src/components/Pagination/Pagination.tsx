import React from 'react';
import classNames from 'classnames';

import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  pageChange: (current: number) => void,
  nextPage: () => void,
  previousPage: () => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  pageChange,
  nextPage,
  previousPage,
}) => {
  const pagesToDisplay = Math.ceil(total / perPage);

  const pages = Array.from({ length: pagesToDisplay - 2 }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <h3 className="pagination__info">
        Displaying
        {` ${perPage * (currentPage - 1) + 1}
        - ${currentPage === pagesToDisplay ? total : (currentPage - 1) * perPage + perPage}
        of ${total}`}
      </h3>
      <ul className="pagination__list">

        <li className="pagination__list_page">
          <button
            className="pagination__list_page--link previous"
            type="button"
            disabled={currentPage === 1}
            onClick={previousPage}
          >
            &laquo;
          </button>
        </li>

        <li
          className="pagination__list_page"
        >
          <button
            className={classNames('pagination__list_page--link', {
              current: currentPage === 1,
            })}
            type="button"
            onClick={() => pageChange(1)}
          >
            1
          </button>
        </li>

        <li
          className="pagination__list_page"
          hidden={currentPage < 4}
        >
          <button
            className="pagination__list_page--link hidden--previous"
            type="button"
          >
            ...
          </button>
        </li>

        {pages.map(item => (
          <li
            key={item}
            className="pagination__list_page"
            hidden={item < currentPage - 2 || item > currentPage}
          >
            <button
              className={classNames('pagination__list_page--link', {
                current: currentPage === item + 1,
              })}
              type="button"
              onClick={() => pageChange(item + 1)}
            >
              {item + 1}
            </button>
          </li>
        ))}

        <li
          className="pagination__list_page"
          hidden={currentPage >= pagesToDisplay - 2}
        >
          <button
            className="pagination__list_page--link hidden--next"
            type="button"
          >
            ...
          </button>
        </li>

        <li
          className="pagination__list_page"
        >
          <button
            className={classNames('pagination__list_page--link', {
              current: currentPage === pagesToDisplay,
            })}
            type="button"
            onClick={() => pageChange(pagesToDisplay)}
          >
            {pagesToDisplay}
          </button>
        </li>

        <li
          className="pagination__list_page"
        >
          <button
            className="pagination__list_page--link next"
            type="button"
            disabled={currentPage === pagesToDisplay}
            onClick={nextPage}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};
