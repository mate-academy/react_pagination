import classNames from 'classnames';
import React from 'react';
import './App.css';

interface Props {
  total: number;
  perPage: number;
  page: number;
  onPageChange:(num: number) => void;
  onInputSetTotal: (num: number) => void;
  onPerPageChange: (num: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  onInputSetTotal,
  onPerPageChange,
}) => {
  const length = Math.ceil(total / perPage);
  const pages = Array.from(Array(length + 1).keys()).slice(1);

  return (
    <>
      <h1 className="text-center">
        {`${perPage * (page - 1) + 1} - ${Math.min(total, perPage * page)} of ${total}`}
      </h1>
      <ul className="nav justify-content-center mb-3">
        <li className="page-item">
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            «
          </button>
        </li>
        {pages.map(num => {
          return (
            <li className="page-item" key={num}>
              <button
                type="button"
                className={classNames('btn', { 'btn-primary': page === num })}
                onClick={() => onPageChange(num)}
              >
                {num}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(page + 1)}
            disabled={page === length}
          >
            »
          </button>
        </li>
      </ul>

      <div className="
        d-flex
        align-items-center
        flex-column
        justify-content-center"
      >

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Total item is equal
            </span>
          </div>
          <input
            type="number"
            onChange={(e) => {
              onInputSetTotal(+e.target.value);
            }}
            className="form-control"
            id="total"
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label
              className="input-group-text"
              htmlFor="inputGroupSelect01"
            >
              Item on Page
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            name="perPage"
            onChange={(e) => onPerPageChange(+e.target.value)}
            value={perPage}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>

  );
};
