/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useRouteMatch } from 'react-router';
import cn from 'classnames';

export const Pagination = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const total = +searchParams.get('total');
  const perPage = +searchParams.get('perPage');
  const selectedPage = +(useRouteMatch().params.page);

  const [pages, setPages] = useState(Math.ceil(total / perPage));

  const buttons = useMemo(() => {
    setPages(Math.ceil(total / perPage));
    let result = [];

    if (pages <= 3) {
      for (let i = 1; i <= pages; i++) {
        result.push(i);
      }

      return result;
    }

    if (selectedPage <= 3) {
      for (let i = 1; i <= selectedPage + 1; i++) {
        result.push(i);
      }

      return [...result, '...', pages];
    }

    if (selectedPage >= pages - 2) {
      for (let i = pages - 2; i <= pages; i++) {
        result.push(i);
      }

      return [1, '...', ...result];
    }

    result = [
      1,
      '...',
      selectedPage - 1,
      selectedPage,
      selectedPage + 1,
      '...',
      pages,
    ];

    return result;
  }, [total, perPage, pages, selectedPage]);

  return (
    <nav aria-label="...">
      <ul className="pagination container">
        <li className={cn('page-item', {
          disabled: selectedPage === 1,
        })}
        >
          <NavLink
            to={{
              pathname: `/${selectedPage - 1}`,
              search,
            }}
            exact
            className="page-link"
            activeClassName="is-active"
          >
            Previous
          </NavLink>
        </li>

        {buttons.map(button => (
          <li
            className={cn('page-item', {
              disabled: button === '...',
            })}
            key={v4()}
          >
            <NavLink
              to={{
                pathname: `/${button}`,
                search,
              }}
              exact
              className="page-link"
              activeClassName="is-active"
            >
              {button}
            </NavLink>
          </li>
        ))}

        <li className={cn('page-item', {
          disabled: selectedPage === pages,
        })}
        >
          <NavLink
            to={{
              pathname: `/${selectedPage + 1}`,
              search,
            }}
            exact
            className="page-link"
            activeClassName="is-active"
          >
            Next
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
