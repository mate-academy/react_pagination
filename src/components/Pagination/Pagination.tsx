import classNames from 'classnames';
import React from 'react';

type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function changePage(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  page: number,
  f: Props['onPageChange'],
) {
  e.preventDefault();

  f(page);
}

export const Pagination = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages: number = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              if (currentPage !== 1) {
                changePage(e, currentPage - 1, onPageChange);
              }
            }}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => {
          const index: number = i + 1;

          return (
            <li
              key={index}
              className={classNames('page-item', {
                active: currentPage === index,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${index}`}
                onClick={e => changePage(e, index, onPageChange)}
              >
                {index}
              </a>
            </li>
          );
        })}

        <li
          className={classNames('page-item', {
            disabled: currentPage === totalPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={e => {
              if (currentPage !== totalPages) {
                changePage(e, currentPage + 1, onPageChange);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map(item => (
          <li key={item.split(' ').at(-1)} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
