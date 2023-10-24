/* eslint-disable react/jsx-indent */
import { FC } from 'react';

interface Props {
  total: number,
  itemsPerPage: number,
  currentPage: number | undefined,
  setCurrentPage: (n: number) => void,
  onPageChange: (page: number) => void,
  items: string[],
}

export const Pagination: FC<Props> = (
  {
    total,
    itemsPerPage,
    currentPage = 1,
    setCurrentPage,
    onPageChange,
    items,
  },
) => {
  const pages: number[] = [];
  const maxPages = Math.ceil(total / itemsPerPage);

  for (let i = 1; i <= maxPages; i += 1) {
    pages.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              const newPage = currentPage - 1;

              onPageChange(newPage);
              setCurrentPage(newPage);
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={
              currentPage === page
                ? 'page-item active'
                : 'page-item'
            }
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                onPageChange(page);
                setCurrentPage(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === maxPages
              ? 'page-item disabled'
              : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === maxPages}
            onClick={() => {
              const newPage = currentPage + 1;

              onPageChange(newPage);
              setCurrentPage(newPage);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice((currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage).map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
