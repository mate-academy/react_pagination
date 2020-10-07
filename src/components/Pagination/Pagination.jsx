import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export const Pagination = ({ total, perPage, page, constrols }) => {
  const paginationArr = [];
  const paginationPages = Math.ceil(total / perPage);
  const fromPages = page * perPage - perPage + 1;
  const toPages = page * perPage > total ? total : page * perPage;

  if (paginationPages > 5) {
    if (page === 1) {
      paginationArr.push(page);
      paginationArr.push(page + 1);
      paginationArr.push(page + 2);
      paginationArr.push('...');
      paginationArr.push(paginationPages);
    }

    if (page > 1 && page < 3) {
      paginationArr.push(page - 1);
      paginationArr.push(page);
      paginationArr.push(page + 1);
      paginationArr.push('...');
      paginationArr.push(paginationPages);
    }

    if (page > 2 && page < 4) {
      paginationArr.push(page - 2);
      paginationArr.push(page - 1);
      paginationArr.push(page);
      paginationArr.push(page + 1);
      paginationArr.push('...');
      paginationArr.push(paginationPages);
    }

    if (page > 3 && page < paginationPages - 2) {
      paginationArr.push(1);
      paginationArr.push('...');
      paginationArr.push(page - 1);
      paginationArr.push(page);
      paginationArr.push(page + 1);
      paginationArr.push('...');
      paginationArr.push(paginationPages);
    }

    if (page > paginationPages - 3 && page < paginationPages - 1) {
      paginationArr.push(1);
      paginationArr.push('...');
      paginationArr.push(page - 1);
      paginationArr.push(page);
      paginationArr.push(page + 1);
      paginationArr.push(page + 2);
    }

    if (page > paginationPages - 2 && page < paginationPages) {
      paginationArr.push(1);
      paginationArr.push('...');
      paginationArr.push(page - 1);
      paginationArr.push(page);
      paginationArr.push(page + 1);
    }

    if (page === paginationPages) {
      paginationArr.push(1);
      paginationArr.push('...');
      paginationArr.push(page - 2);
      paginationArr.push(page - 1);
      paginationArr.push(page);
    }
  } else {
    for (let i = 1; i <= paginationPages; i += 1) {
      paginationArr.push(i);
    }
  }

  return (
    <>
      <div className="active-items">
        {`Post ${fromPages}-${toPages} of ${total}`}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          <li
            className={classNames(
              'page-item',
              { disabled: page === 1 },
            )}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => constrols(page - 1)}
            >
              Previous
            </button>
          </li>

          {paginationArr.map(pagination => (
            pagination === +pagination
              ? (
                <li
                  key={uuidv4()}
                  className={classNames(
                    'page-item',
                    { active: pagination === page },
                  )}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => constrols(pagination)}
                  >
                    {pagination}
                  </button>
                </li>
              )
              : (
                <li
                  key={uuidv4()}
                  className="page-item page-link ellipsis"
                >
                  {pagination}
                </li>
              )
          ))}

          <li
            className={classNames(
              'page-item',
              { disabled: page === Math.ceil(total / perPage) },
            )}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => constrols(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  constrols: PropTypes.func.isRequired,
};
