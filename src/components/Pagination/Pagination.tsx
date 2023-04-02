import classNames from 'classnames';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  total: number,
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
  visibleItems: string[]
};

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  onPageChange,
  total,
  visibleItems,
}) => {
  const isFirstPage = currentPage === 1;
  const numbersOfPage = Math.ceil(total / perPage);
  const isLastPage = currentPage === numbersOfPage;

  const listItem = [];

  for (let i = 1; i <= numbersOfPage; i += 1) {
    listItem.push(
      <li
        className={classNames(
          'page-item',
          { active: currentPage === i },
        )}
        key={i}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => {
            if (currentPage !== i) {
              onPageChange(i);
            }
          }}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {listItem}

        <li className={classNames('page-item', { disabled: isLastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => {
              if (currentPage !== numbersOfPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={uuidv4()}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
