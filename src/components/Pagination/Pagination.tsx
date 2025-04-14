import React from 'react';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = props => {
  const totalPages = Math.ceil(props.total.length / props.perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevPage = () => {
    if (props.currentPage > 1) {
      props.onPageChange(props.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (props.currentPage < totalPages) {
      props.onPageChange(props.currentPage + 1);
    }
  };

  const startIndex = (props.currentPage - 1) * props.perPage;
  const endIndex = props.currentPage * props.perPage;
  const visibleItems = props.total.slice(startIndex, endIndex);

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${props.currentPage === 1 ? 'disabled' : ''}`}
          onClick={handlePrevPage}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={props.currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${props.currentPage === page ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${props.currentPage === totalPages ? 'disabled' : ''}`}
          onClick={handleNextPage}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={props.currentPage === totalPages ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(value => (
          <li data-cy="item" key={value}>
            {value}
          </li>
        ))}
      </ul>
    </>
  );
};
