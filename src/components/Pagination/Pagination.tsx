import React from 'react';
type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination" data-cy="pagination">
      <p className="pagination-info" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${total})`}
      </p>

      <ul className="pagination-list">
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <a
            href="#prev"
            className="pagination-link"
            data-cy="prevLink"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={e => handlePageClick(e, currentPage - 1)}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <li key={page} className={page === currentPage ? 'active' : ''}>
            <a
              href={`#${page}`}
              className="pagination-link"
              data-cy="pageLink"
              onClick={e => handlePageClick(e, page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={currentPage === totalPages ? 'disabled' : ''}>
          <a
            href="#next"
            className="pagination-link"
            data-cy="nextLink"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={e => handlePageClick(e, currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </nav>
  );
};
