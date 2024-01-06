import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageLink = (page: number) => (
    <li
      key={page}
      className={`page-item ${currentPage === page ? 'active' : ''}`}
    >
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${page}`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </a>
    </li>
  );

  const renderPaginationInfo = () => {
    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

    return `Page ${currentPage} (items ${startItem} - ${endItem} of ${total})`;
  };

  const renderPerPageSelector = () => (
    <select
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
    >
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  );

  return (
    <div>
      <p className="lead" data-cy="info">
        {renderPaginationInfo()}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">{renderPerPageSelector()}</div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <ul className="pagination">
        {/* Render « (prev) link */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {/* Render page links */}
        {Array.from({ length: totalPages },
          (_, index) => renderPageLink(index + 1))}
        {/* Render » (next) link */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
