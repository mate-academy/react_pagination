import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange:(num: number) => void;
  onSetTotal: (num: number) => void;
  onPerPageChange: (num: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  page,
  onSetTotal,
  onPageChange,
  onPerPageChange,
}) => {
  const length = Math.ceil(total / perPage);
  const pages = Array.from(Array(length + 1).keys()).slice(1);
  const fromItems = perPage * (page - 1) + 1;
  const toItems = Math.min(total, perPage * page);

  return (
    <div className="Pagination">
      <h1>{`${fromItems} - ${toItems} of ${total}`}</h1>

      <ul className="pagination">
        <li
          className="page-item"
        >
          <button
            className="page-link"
            type="button"
            onClick={() => {
              onPageChange(page - 1);
            }}
            disabled={page === 1}
          >
            &laquo;
          </button>
        </li>

        {pages.map(currPage => (
          <li
            className={classNames(
              'page-item',
              {
                active: currPage === page,
              },
            )}
            key={currPage}
          >
            <button
              className="page-link"
              type="button"
              onClick={() => {
                onPageChange(currPage);
              }}
            >
              {currPage}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            className="page-link"
            type="button"
            onClick={() => {
              onPageChange(page + 1);
            }}
            disabled={page === length}
          >
            &raquo;
          </button>
        </li>
      </ul>

      <div className="input-group mb-3 width">
        <span className="input-group-text">№</span>
        <input
          className="form-control"
          placeholder="n-th pages"
          aria-describedby="basic-addon1"
          type="number"
          onChange={(event) => {
            onSetTotal(Number(event.target.value));
            onPageChange(1);
          }}
        />
      </div>

      <select
        name="perPage"
        value={perPage}
        className="form-select"
        onChange={(event) => {
          onPageChange(1);
          onPerPageChange(Number(event.target.value));
        }}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};
