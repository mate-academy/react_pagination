import React, { useState } from 'react';
import classNames from 'classnames';

import './Pagination.scss';

interface Props {
  total: number,
  onPerPageChange: (number: number) => void,
  perPages: number[],
  perPage: number,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPages,
  perPage,
  onPerPageChange,
}) => {
  const [activePage, setActivePage] = useState(1);
  const [perPageSelect, setPerPageSelect] = useState(false);
  const [openPerPageSelect, setOpenPerPageSelect] = useState(false);

  const pages = Math.ceil(total / perPage);

  const arrPages = Array.from({ length: pages }, (_, i) => i + 1);
  const perPageBtnClass = classNames('Pagination__select-list', {
    'Pagination__select-list--open': perPageSelect,
  });

  let endWithInfo = activePage * perPage;
  const startWithInfo = endWithInfo - perPage + 1;

  if (endWithInfo > total) {
    endWithInfo = total;
  }

  const preActivePage = activePage - 1;
  const postActivePage = activePage + 1;

  const visiblePages = [
    1, preActivePage, activePage, postActivePage, Math.ceil(pages),
  ];

  return (
    <div className="Pagination">
      <div className="Pagination__header">
        <div className="Pagination__select">
          <p className="Pagination__select-title">Number of items per page</p>
          <button
            type="button"
            className={classNames(
              openPerPageSelect
                ? 'Pagination__select-button Pagination__select-button--open'
                : 'Pagination__select-button',
            )}
            onClick={() => {
              setPerPageSelect(!perPageSelect);
              setOpenPerPageSelect(!openPerPageSelect);
            }}
          >
            {perPage}
          </button>
          <ul
            className={perPageBtnClass}
          >
            {perPages.map(number => (
              <li
                key={number}
                className="Pagination__select-li"
              >
                <button
                  type="button"
                  className="Pagination__select-item"
                  onClick={() => {
                    onPerPageChange(number);
                    setPerPageSelect(!perPageSelect);
                    setOpenPerPageSelect(!openPerPageSelect);
                    setActivePage(1);
                  }}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="Pagination__withInfo">
          {`${startWithInfo} - ${endWithInfo} of ${total}`}
        </p>
      </div>

      <div className="Pagination__pages">
        <button
          type="button"
          disabled={activePage === 1}
          className="Pagination__prev"
          onClick={() => {
            setActivePage(activePage - 1);
          }}
        >
          &laquo;
        </button>
        {arrPages.map(page => (
          <button
            type="button"
            key={page}
            className={
              activePage === page
                ? 'Pagination__page active'
                : 'Pagination__page'
            }
            onClick={() => setActivePage(page)}
          >
            {visiblePages.includes(page) ? page : '.'}
          </button>
        ))}
        <button
          type="button"
          disabled={activePage === arrPages.length}
          className="Pagination__next"
          onClick={() => setActivePage(activePage + 1)}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};
