import React from 'react';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange?: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagination = Math.ceil(total.length / perPage);

  function onClickHandler(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    chek: number,
  ) {
    e.preventDefault();
    if (chek === 1) {
      if (currentPage > 1 && onPageChange) {
        onPageChange(currentPage - 1);
      }
    }

    if (chek === 2) {
      if (currentPage < pagination && onPageChange) {
        onPageChange(currentPage + 1);
      }
    }
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={e => onClickHandler(e, 1)}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {Array.from({ length: pagination }, (_, index) => {
          const page = index + 1;

          return (
            <li
              onClick={() => onPageChange && onPageChange(page)}
              key={page}
              className={`page-item ${currentPage === page ? 'active' : ''}`}
            >
              <a data-cy="pageLink" className="page-link" href={`#${page}`}>
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${currentPage === pagination ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={e => onClickHandler(e, 2)}
            aria-disabled={currentPage === pagination ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array.from({ length: perPage }, (_, index) => {
          const item = total[currentPage * perPage - perPage + index];

          return !!item ? (
            <li data-cy="item" key={item}>
              {item}
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
};
