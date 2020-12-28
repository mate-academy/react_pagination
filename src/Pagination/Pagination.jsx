import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { makeEmojiArray, makePagesArray } from '../helpers/makePagesArray';

export const Pagination = ({
  pagin,
  onChangePage,
  onClickPrev,
  onClickNext,
  onChangePerPage,
  onClickOption,
}) => {
  const { total, perPage, page, option } = pagin;
  const lastPage = Math.ceil(total / perPage);
  const forPage = ((page - 1) * perPage);
  const toPage = perPage * page > total
    ? total : perPage * page;
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const changeHistory = (name, value) => {
    searchParams.set(name, value);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <div>
      <div className="emoji">
        {makeEmojiArray(total).slice(forPage, toPage).map(t => (
          <span className="emoji" key={t}>{t}</span>
        ))}
      </div>
      <div>
        <span>
          {`${forPage + 1} - ${toPage} of ${total}`}
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
          className={classNames('option', {
            paginFerst: option,
            paginSecond: !option,
          })}
          onClick={onClickOption}
        >
          Option
        </button>
      </div>
      <div className="pagination">
        <button
          type="button"
          className={classNames('prev', { disabl: page === 1 })}
          disabled={page === 1}
          onClick={() => {
            onClickPrev();
            changeHistory('page', page - 1);
          }}
        >
          Prev
        </button>
        {(option
          ? makePagesArray(lastPage, page)
          : [...Array(lastPage).keys()].map(item => item + 1))
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
          className={classNames('next', { disabl: page === lastPage })}
          disabled={page === lastPage}
          onClick={() => {
            onClickNext();
            changeHistory('page', page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pagin: PropTypes.shape().isRequired,
  onChangePage: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onChangePerPage: PropTypes.func.isRequired,
  onClickOption: PropTypes.func.isRequired,
};
