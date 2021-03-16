import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import { PrevPage } from '../PrevPage/PrevPage';
import { NextPage } from '../NextPage/NextPage';
import { WithInfo } from '../WithInfo/WithInfo';
import './Pagination.css';

export const Pagination = ({
  total,
  perPage,
  page,
  handlerPage,
  prevPageHandler,
  nextPageHandler,
  withInfo,
}) => {
  const pagesQuantity = Math.ceil(total / perPage);
  const pages = Array(pagesQuantity).fill(1);

  return (
    <>
      <ul className="pagination">
        <PrevPage selectedPage={page} prevPageHandler={prevPageHandler} />
        {pages.map((_, i) => (
          <li
            key={i + 1}
            className={classNames(
              'page-item',
              { active: (i + 1) === page },
            )}
            onClick={(e) => {
              e.preventDefault();
              handlerPage(i + 1);
            }}
          >
            <a
              className="page-link"
              href={(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))
        }
        <NextPage
          pagesQuantity={pagesQuantity}
          selectedPage={page}
          nextPageHandler={nextPageHandler}
        />
      </ul>
      {page >= withInfo && <WithInfo />}
    </>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handlerPage: PropTypes.func.isRequired,
  prevPageHandler: PropTypes.func.isRequired,
  nextPageHandler: PropTypes.func.isRequired,
  withInfo: PropTypes.number.isRequired,
};
