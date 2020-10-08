import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export const Pagination = ({ total, perPage, page, constrols }) => {
  const paginationPages = Math.ceil(total / perPage);
  const fromPages = page * perPage - perPage + 1;
  const toPages = page * perPage > total ? total : page * perPage;
  const paginationArr = getPaginationControls(page, paginationPages);

  function getPaginationControls(active, last) {
    if (last > 5) {
      if (active === 1) {
        return [active, active + 1, active + 2, '...', last];
      }

      if (active > 1 && active < 3) {
        return [active - 1, active, active + 1, '...', last];
      }

      if (active > 2 && active < 4) {
        return [active - 2, active - 1, active, active + 1, '...', last];
      }

      if (active > 3 && active < last - 2) {
        return [1, '...', active - 1, active, active + 1, '...', last];
      }

      if (active > last - 3 && active < last - 1) {
        return [1, '...', active - 1, active, active + 1, active + 2];
      }

      if (active > last - 2 && active < last) {
        return [1, '...', active - 1, active, active + 1];
      }

      if (active === last) {
        return [1, '...', active - 2, active - 1, active];
      }
    }

    const arr = [];

    for (let i = 1; i <= last; i += 1) {
      arr.push(i);
    }

    return arr;
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
            pagination !== '...'
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
