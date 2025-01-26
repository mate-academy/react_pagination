import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage;

  const items = getNumbers(1, total)
    .slice(start, end)
    .map(n => `Item ${n}`);
  const pages = Math.ceil(total / perPage);

  return (
    <>
      {/* Пагінація */}
      <ul className="pagination">
        {/* Попередня сторінка */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {/* Сторінки */}
        {Array.from({ length: pages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={e => {
                e.preventDefault();
                onPageChange(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}

        {/* Наступна сторінка */}
        <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={e => {
              e.preventDefault();
              if (currentPage < pages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      {/* Список елементів */}
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
