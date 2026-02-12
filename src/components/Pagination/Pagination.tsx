import { useEffect, useState } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const [pages, setPages] = useState([1]);

  useEffect(() => {
    const pagesCount = Math.ceil(total / perPage);
    const pagesArr = [];

    for (let i = 1; i <= pagesCount; i++) {
      pagesArr.push(i);
    }

    setPages(pagesArr);
  }, [perPage]);

  return (
    <ul className="pagination">
      <li
        className={`${currentPage === 1 ? 'page-item disabled' : 'page-item'}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? true : false}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(page => {
        return (
          <li
            key={page}
            className={`${page === currentPage ? 'page-item active' : 'page-item'}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={`${currentPage === pages.length ? 'page-item disabled' : 'page-item'}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length ? true : false}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
