import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

type PaginationProps = {
  total:string[];
  perPage:string
  currentPage:string
  setCurrentPage:React.Dispatch<React.SetStateAction<string>>;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(total.length / +perPage); i += 1) {
    pages.push(i);
  }

  const funcVisibleItems = (items:string[], current:number) => {
    return ([...items].splice(+perPage * +current - +perPage, +perPage));
  };

  const defaultVisibleItem = funcVisibleItems(total, +currentPage);
  const [visibleItems, setVisibleItems] = useState(defaultVisibleItem);

  useEffect(() => {
    setVisibleItems(funcVisibleItems(total, +currentPage));
  }, [perPage]);

  return (
    <>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: +currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => setCurrentPage(`${+currentPage - 1}`)}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li className={classNames(
            'page-item',
            { active: page === +currentPage },
          )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                setCurrentPage(`${page}`);
                setVisibleItems(funcVisibleItems(total, page));
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            { disabled: Math.ceil(total.length / +perPage) === +currentPage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => setCurrentPage(`${+currentPage + 1}`)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
