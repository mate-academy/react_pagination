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
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  page: number,
  func: Props['onPageChange'],
) {
  event.preventDefault();

  func(page);
}

export const Pagination = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

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
            onClick={event => {
              if (currentPage !== 1) {
                changePage(event, currentPage - 1, onPageChange);
              }
            }}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => {
          const index = i + 1;

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
                onClick={event => changePage(event, index, onPageChange)}
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
            onClick={event => {
              if (currentPage !== totalPages) {
                changePage(event, currentPage + 1, onPageChange);
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
