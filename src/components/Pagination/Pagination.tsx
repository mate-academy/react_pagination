import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage?: number,
  onPageChange: (page: number) => void,
};


export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Array.from({ length: Math.ceil(total / perPage) }, (_, index) => index + 1);

  return (
    <>
      <ul className="pagination">
        <li
          className={currentPage === 1  ? 'page-item disabled' : 'page-item'}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled= {currentPage === 1 ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}>
            «
          </a>
        </li>
        {pagesCount.map(page => (
          <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                if (currentPage !== page) {
                  onPageChange(page)
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li  className={currentPage === pagesCount.length ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled= {currentPage === pagesCount.length ? 'true' : 'false'}
            onClick={() => {
              if (currentPage !== pagesCount.length) {
                onPageChange(currentPage + 1);
              }
            }}>
            »
          </a>
        </li>
      </ul>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, total)} of {total})
      </p>
    </>
  )
};
