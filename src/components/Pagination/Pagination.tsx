import classNames from 'classnames';
import React from 'react';

interface Props {
  items: string[]
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC< Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageLength = Math.ceil(total / perPage);
  const pages = Array.from(Array(pageLength + 1).keys()).slice(1);

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(num => {
          return (
            <li
              className={classNames('page-item', {
                active: currentPage === num,
              })}
              key={num}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${num}`}
                onClick={() => onPageChange(num)}
              >
                {num}
              </a>
            </li>
          );
        })}

        <li className={classNames('page-item', {
          disabled: currentPage === pageLength,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageLength}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {
          items
            .slice((currentPage - 1) * perPage,
              (currentPage - 1) * perPage + perPage)
            .map(item => {
              return (
                <li
                  data-cy="item"
                  key={item}
                >
                  {item}
                </li>
              );
            })
        }
      </ul>
    </>
  );
};
