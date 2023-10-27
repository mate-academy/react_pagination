/* eslint-disable react/jsx-indent */
import { FC, useEffect, useState } from 'react';

interface Props {
  total: number,
  itemsPerPage: number,
  setCurrentPage: (n: number) => void,
  onPageChange: (page: number) => void,
  items: string[],
  currentPage: number,
}

export const Pagination: FC<Props> = (
  {
    total,
    itemsPerPage,
    setCurrentPage,
    onPageChange,
    items,
    currentPage = 1,
  },
) => {
  const [pages, setPages] = useState<number[]>([]);

  const maxPages = Math.ceil(total / itemsPerPage);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  useEffect(() => {
    const newPages:number[] = [];

    for (let i = 1; i <= maxPages; i += 1) {
      newPages.push(i);
    }

    setPages(newPages);
  }, []);

  const isPageFirst = () => currentPage === 1;
  const isPageLast = () => currentPage === maxPages;

  const handlePageChange = (page: number): void => {
    onPageChange(page);
    setCurrentPage(page);
  };

  const preparedItems = items.slice((prevPage) * itemsPerPage,
    currentPage * itemsPerPage);

  return (
    <>
      <ul className="pagination">
        <li className={isPageFirst() ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isPageFirst()}
            onClick={() => {
              handlePageChange(prevPage);
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
                if (currentPage !== page) {
                  handlePageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            isPageLast()
              ? 'page-item disabled'
              : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isPageLast()}
            onClick={() => {
              handlePageChange(nextPage);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {preparedItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
