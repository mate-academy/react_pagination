import classNames from 'classnames';
import React, { useState } from 'react';
import './Pagination.scss';

interface Data {
  total: number;
  perPage: number;
  page: number;
}

const Pagination: React.FC<Data> = ({ total, perPage, page }) => {
  const [activePage, setActivePage] = useState(page);
  const [limit, setLimit] = useState(perPage);

  const arrPages = new Array(Math.ceil(total / limit)).fill('');

  // eslint-disable-next-line
  const onPageChange = (event: any): void => {
    setActivePage(+event.target.textContent);
  };

  const goToLeft = () => {
    setActivePage(activePage - 1);
  };

  const goToRight = () => {
    setActivePage(activePage + 1);
  };

  const from = activePage * limit - limit + 1;
  const to = activePage * limit > total ? total : activePage * limit;

  const validationGoToRight = activePage + limit < arrPages.length
    ? activePage + limit
    : arrPages.length;
  const validationGoToLeft = activePage - limit < 1 ? 1 : activePage - limit;

  return (
    <div>
      <p>
        {`info: ${from} - ${to} of ${total}`}
      </p>

      <select
        onChange={(event) => {
          setLimit(+event.target.value);
          setActivePage(1);
        }}
        defaultValue={limit}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

      <nav className="pagination">
        <ul className="pagination__list">

          <li className="pagination__item">
            <button
              className="pagination__btn"
              type="button"
              onClick={goToLeft}
              disabled={activePage === 1}
            >
              &laquo;
            </button>
          </li>

          <li className="pagination__item">
            <button
              className="pagination__btn"
              type="button"
              hidden={activePage <= 2}
              onClick={(event) => {
                onPageChange(event);
              }}
            >
              1
            </button>
          </li>

          <li className="pagination__item">
            <button
              className="pagination__btn"
              type="button"
              hidden={activePage <= 2}
              onClick={() => {
                setActivePage(validationGoToLeft);
              }}
            >
              ...
            </button>
          </li>

          {arrPages.map((_, index) => {
            const visibleBtn = index !== activePage - 1
              && index !== activePage - 2
              && index !== activePage;

            const ind = index;

            return (
              <li
                className="pagination__item"
                key={ind}
                hidden={visibleBtn}
              >
                <button
                  className={classNames(
                    'pagination__btn',
                    { 'pagination__btn--act': activePage === index + 1 },
                  )}
                  type="button"
                  onClick={(event) => {
                    onPageChange(event);
                  }}
                >
                  {index + 1}
                </button>
              </li>
            );
          })}

          <li className="pagination__item">
            <button
              className="pagination__btn"
              type="button"
              hidden={activePage >= arrPages.length - 1}
              onClick={() => {
                setActivePage(validationGoToRight);
              }}
            >
              ...
            </button>
          </li>

          <li className="pagination__item">
            <button
              className="pagination__btn"
              type="button"
              hidden={activePage >= arrPages.length - 1}
              onClick={(event) => {
                onPageChange(event);
              }}
            >
              {arrPages.length}
            </button>
          </li>

          <li className="pagination__item">
            <button
              className="pagination__btn"
              type="button"
              onClick={goToRight}
              disabled={activePage === arrPages.length}
            >
              &raquo;
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
