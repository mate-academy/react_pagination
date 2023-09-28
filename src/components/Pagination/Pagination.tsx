import React from 'react';

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
  const totalPages = Math.ceil(total / perPage);
  const links = [];

  function prevLinkHandler() {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  }

  function nextLinkHandler() {
    if (currentPage === totalPages) {
      return;
    }

    onPageChange(currentPage + 1);
  }

  for (let i = 1; i <= totalPages; i += 1) {
    links.push(
      <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
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
          onClick={prevLinkHandler}
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
          onClick={nextLinkHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
