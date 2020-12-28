import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { makePagesArray } from '../helpers/makePagesArray';

export const Pagination = ({
  pagination,
  onChangePage,
  onClickPrev,
  onClickNext,
  onChangePerPage,
  onChangePagination,
}) => {
  const { total, perPage, page, paginChanged } = pagination;
  const lastPage = Math.ceil(total / perPage);
  const info = `${((page - 1) * perPage) + 1} -
    ${perPage * page > total ? total : perPage * page} of ${total}`;
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const changeHistory = (name, value) => {
    searchParams.set(name, value);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <>
      <div>
        <span>
          {info}
        </span>
        <select
          typy="select"
          value={perPage}
          onChange={(e) => {
            onChangePerPage(e);
            changeHistory('page', 1);
            changeHistory('perPage', e.target.value);
          }}
        >
          {[3, 5, 10, 20].map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <button
          type="button"
          className={classNames('paginChanged', {
            no_changed: !paginChanged,
            changed: paginChanged,
          })}
          onClick={onChangePagination}
        >
          Change
        </button>
      </div>
      <div className="pagination">
        <div className={classNames('pagin', {
          pagin_first: !paginChanged,
          pagin_second: paginChanged,
        })}
        >
          {`${!paginChanged ? 'Pagination 1' : 'Pagination 2'}`}
        </div>
        <button
          type="button"
          className={classNames('prev', { disabled: page === 1 })}
          disabled={page === 1}
          onClick={() => {
            onClickPrev();
            changeHistory('page', page - 1);
          }}
        >
          Prev
        </button>
        {(paginChanged
          ? makePagesArray(lastPage, page)
          : [...Array(lastPage).keys()].map(val => val + 1))
          .map(item => (
            <button
              key={item}
              type="button"
              className={classNames('button', { activ: page === item })}
              onClick={() => {
                onChangePage(item);
                changeHistory('page', item);
              }}
              disabled={item === '...'}
            >
              {item}
            </button>
          ))}
        <button
          type="button"
          className={classNames('next', { disabled: page === lastPage })}
          disabled={page === lastPage}
          onClick={() => {
            onClickNext();
            changeHistory('page', page + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.shape().isRequired,
  onChangePage: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onChangePerPage: PropTypes.func.isRequired,
  onChangePagination: PropTypes.func.isRequired,
};
