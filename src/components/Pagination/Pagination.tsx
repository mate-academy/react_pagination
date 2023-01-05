import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const currentPages = [];
  const numberOfPages = Math.ceil(total / perPage);

  for (let i = 1; i <= numberOfPages; i += 1) {
    currentPages.push(i);
  }

  const pageClickHandler = (
    e:React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const el = e.target as HTMLElement;
    const clickedPAge = Number(el.textContent);

    if (clickedPAge !== currentPage) {
      onPageChange(clickedPAge);
    }
  };

  const prevClickHandler = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextClickHandler = () => {
    if (currentPage !== numberOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevClickHandler}
        >
          «
        </a>
      </li>
      {currentPages.map(page => (
        <li className={`page-item ${page === currentPage ? 'active' : ''}`} key={page}>
          <a data-cy="pageLink" className="page-link" href={`#${page}`} onClick={pageClickHandler}>{page}</a>
        </li>
      ))}

      <li className={`page-item ${currentPage === numberOfPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages}
          onClick={nextClickHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
