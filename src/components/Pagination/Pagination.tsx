import React from 'react';
import { PageList } from '../PageList';

interface PageListProps {
  countOfPages: number;
  total: number;
  perPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PageListProps> = ({
  countOfPages,
  total,
  perPage,
  currentPage,
  onChangePage,
}) => {
  const pageElements: JSX.Element[] = [];

  const changePage = (page: number) => {
    onChangePage(page);
  };

  for (let i = 1; i <= countOfPages; i += 1) {
    pageElements.push(
      <PageList key={i} page={i} active={currentPage} onClick={changePage} />,
    );
  }

  return (
    <>
      <ul className="pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => currentPage !== 1 && onChangePage(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pageElements}

        <li
          className={
            currentPage >= countOfPages ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage >= countOfPages ? 'true' : 'false'}
            onClick={() =>
              currentPage < countOfPages && onChangePage(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {Array.from({ length: perPage }, (_, index) => {
          if (index + perPage * (currentPage - 1) + 1 <= total) {
            return (
              <li key={index} data-cy="item">
                Item {index + perPage * (currentPage - 1) + 1}
              </li>
            );
          }

          return null;
        })}
      </ul>
    </>
  );
};
