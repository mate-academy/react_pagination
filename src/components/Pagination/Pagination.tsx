import React from 'react';

type Props = {
  total: number; // total number of items to paginate
  perPage: number;// number of items per page
  currentPage: number; /* optional with 1 by default */
  onPageChange: (page:number) => void;
};

export const Pagination:React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const links = [];

  const prevPageHandler = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage === totalPages) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  for (let i = 1; i <= totalPages; i += 1) {
    links.push(
      <li
        className={`page-item ${i === currentPage ? 'active' : ''}`}
        key={i}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPageHandler}
        >
          «
        </a>
      </li>
      {links}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={nextPageHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
