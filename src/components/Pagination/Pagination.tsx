interface PaginationProps {
  currentPage: number;
  totalPage: number;
  numbers: number[];
  perPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  numbers,
  perPage,
  setCurrentPage,
}) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
        <a
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage <= 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {numbers.map(num => (
        <li
          key={num}
          className={`page-item ${currentPage === num ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            onClick={() => setCurrentPage(num)}
            className="page-link"
            href={`#${num}`}
          >
            {num}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${
          currentPage === totalPage || perPage * currentPage >= totalPage
            ? 'disabled'
            : ''
        }`}
      >
        <a
          onClick={() => {
            if (currentPage >= 1 && currentPage < totalPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === totalPage || perPage * currentPage >= totalPage
              ? 'true'
              : 'false'
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
