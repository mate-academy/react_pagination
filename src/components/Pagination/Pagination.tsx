import React, { MouseEvent } from 'react';

type Props = {
  visibleItems: string[],
  perPage: number,
  currentPage: number,
  onPageClick: (page: number) => void,
  onArrowClick: (event: MouseEvent<HTMLElement>) => void,
};

export const Pagination: React.FC<Props> = ({
  visibleItems,
  perPage,
  currentPage,
  onPageClick,
  onArrowClick,
}) => {
  const arrayOfPages = Array.from(Array(perPage), (_, i) => i + 1);
  const isFirst = currentPage === arrayOfPages[0];
  const isLast = currentPage === arrayOfPages.at(-1);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${isFirst && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirst}
            onClick={onArrowClick}
          >
            «
          </a>
        </li>

        {arrayOfPages.map((page) => {
          const handleChange = () => {
            onPageClick(page);
          };

          return (
            <li
              className={`page-item ${currentPage !== page || 'active'}`}
              key={page}
            >
              <a
                id={String(page)}
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={handleChange}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li className={`page-item ${isLast && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLast}
            onClick={onArrowClick}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
