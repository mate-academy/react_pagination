import React, { useEffect } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onePageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onePageChange,
}) => {
  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage;

  const items = getNumbers(1, total)
    .slice(start, end)
    .map(n => `Item ${n}`);
  const pages = Math.ceil(total / perPage);

  useEffect(() => {
    if (currentPage > pages) {
      onePageChange(1);
    }
  }, [perPage, currentPage, pages, onePageChange]);

  return (
    <>
      <ul className="pagination">
        <li className={`page item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            href="#prev"
            data-cy="prevLink"
            className="page-link"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                onePageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {Array.from({ length: pages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
          >
            <a
              href={`#${i + 1}`}
              data-cy="pageLink"
              className="page-link"
              onClick={e => {
                e.preventDefault();
                onePageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
          <a
            href="#next"
            data-cy="nextLink"
            className="page-link"
            aria-disabled={currentPage === pages}
            onClick={e => {
              e.preventDefault();
              if (currentPage < pages) {
                onePageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
