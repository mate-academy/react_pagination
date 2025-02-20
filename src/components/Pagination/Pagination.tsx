import React from 'react';

type PageProp = {
  total: number;
  perPage: number;
  pageSelected: number;
  onPageSelected: (value: number) => void;
};

export const Pagination: React.FC<PageProp> = ({
  total,
  perPage,
  pageSelected,
  onPageSelected,
}) => {
  const totalPage = Math.ceil(total / perPage);

  const pages: number[] = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${pageSelected === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={pageSelected === 1 ? 'true' : 'false'}
            onClick={(e) => {
                if (pageSelected > 1) {
                  onPageSelected(pageSelected - 1);
                }
                e.preventDefault(); // Prevent default behavior for disabled state
              }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={pageSelected === page ? 'page-item active' : 'page-item'}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageSelected(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${pageSelected === totalPage ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={pageSelected === totalPage ? 'true' : 'false'}
            onClick={(e) => {
                if (pageSelected < totalPage) {
                  onPageSelected(pageSelected + 1);
                }
                e.preventDefault(); // Prevent default behavior for disabled state
              }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
