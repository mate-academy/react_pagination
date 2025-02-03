import React from 'react';

type Props = {
  maxPagesAvailable: number;
  currentPage: number;
  onSelectpage: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  maxPagesAvailable,
  currentPage,
  onSelectpage,
}: Props) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={`${currentPage === 0}`}
          onClick={e => {
            e.preventDefault();
            if (currentPage === 0) {
              return;
            }

            onSelectpage(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {Array.from({ length: maxPagesAvailable }, (_, idx) => {
        return (
          <li
            className={`page-item ${idx === currentPage ? 'active' : ''}`}
            key={idx}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${idx + 1}`}
              onClick={e => {
                e.preventDefault();
                onSelectpage(idx);
              }}
            >
              {idx + 1}
            </a>
          </li>
        );
      })}
      <li
        className={`page-item ${currentPage + 1 === maxPagesAvailable ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage + 1 === maxPagesAvailable}`}
          onClick={e => {
            e.preventDefault();

            if (currentPage + 1 === maxPagesAvailable) {
              return;
            }

            onSelectpage(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
