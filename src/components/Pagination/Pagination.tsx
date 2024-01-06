import { PropsPagination } from '../../types/pagination';

export const Pagination: React.FC<PropsPagination> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);

  const pageNumbers: number[] = Array
    .from({ length: pageCount }, (_, i) => i + 1);

  const handleOpenPrevPage = () => (
    currentPage !== 1 && onPageChange(currentPage - 1)
  );

  const handleOpenNextPage = () => currentPage !== pageCount
  && onPageChange(currentPage + 1);

  return (
    <ul className="pagination">
      <li className={
        currentPage === 1 ? 'page-item disabled' : 'page-item'
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={handleOpenPrevPage}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={
            pageNumber === currentPage ? 'page-item active' : 'page-item'
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={
        currentPage === pageCount ? 'page-item disabled' : 'page-item'
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={handleOpenNextPage}
          aria-disabled={currentPage === pageCount}
        >
          »
        </a>
      </li>
    </ul>
  );
};
