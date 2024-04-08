import React from "react";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 0,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const prevPage = () => {
    const previousPage = Math.max(currentPage - 1, 0);

    onPageChange(previousPage);
  };

  const nextPage = () => {
    const theNextPage = Math.min(currentPage + 1, totalPages - 1);

    onPageChange(theNextPage);
  };

  return (
    <>
      <ul className="pagination">
        <li
          key="1"
          className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
          onClick={prevPage}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 0 ? "true" : "false"}
          >
            «
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i;

          return (
            <li
              key={pageNum}
              className={`page-item ${currentPage === pageNum ? "active" : ""}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageNum + 1}`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum + 1}
              </a>
            </li>
          );
        })}
        <li
          key={totalPages + 1}
          className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}
          onClick={nextPage}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages - 1 ? "true" : "false"}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {Array.from({ length: perPage }, (_, i) => {
          const linkNum = i + perPage * currentPage;

          if (linkNum < total) {
            return (
              <li key={linkNum + 1} data-cy="item">
                {`Item ${linkNum + 1}`}
              </li>
            );
          }

          return null;
        })}
      </ul>
    </>
  );
};
