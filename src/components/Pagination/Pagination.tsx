import React from 'react';
import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  items: string[],
};

export const Pagination: React.FC<Props> = ({
  items, total, perPage, currentPage, onPageChange,
}) => {
  const pagesCount = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, i) => i + 1,
  );
  const lastPage = pagesCount[pagesCount.length - 1];

  const handlePrevClick = (page: number) => {
    if (page > pagesCount[0]) {
      onPageChange(page - 1);
    }
  };

  const handleNextClick = (page: number) => {
    if (page < lastPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={
            cn(
              'page-item',
              { disabled: currentPage === pagesCount[0] },
            )
          }
          key="prevLink"
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => handlePrevClick(currentPage)}
          >
            «
          </a>
        </li>

        {
          pagesCount.map(page => (
            <li
              className={
                cn('page-item',
                  { active: page === currentPage })
              }
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => {
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          ))
        }
        <li
          className={
            cn(
              'page-item',
              { disabled: currentPage === lastPage },
            )
          }
          key="nextLink"
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => handleNextClick(currentPage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (<li data-cy="item" key={item}>{item}</li>))}
      </ul>
    </>
  );
};
