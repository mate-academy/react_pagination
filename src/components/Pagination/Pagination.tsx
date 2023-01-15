import React from 'react';

type Props = {
  // total: number,
  visibleItems: string[],
  perPage: number,
  currentPage: number,
  onPageClick: (page: number) => void,
  toPrevPage: () => void,
  toNextPage: () => void,
};

export const Pagination: React.FC<Props> = ({
  visibleItems,
  perPage,
  currentPage,
  onPageClick,
  toPrevPage,
  toNextPage,
}) => {
  const arrayOfPages = Array.from(Array(perPage), (_, i) => i + 1);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === arrayOfPages[0] && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === arrayOfPages[0]}
            onClick={toPrevPage}
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

        <li className={`page-item ${currentPage === arrayOfPages.at(-1) && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === arrayOfPages.at(-1)}
            onClick={toNextPage}
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
