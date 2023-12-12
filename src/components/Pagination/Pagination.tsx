interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (event: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPagePages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => onPageChange(-1)}
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      <li className="page-item active">
        <a
          data-cy="pageLink"
          className={currentPage === 1 ? 'page-link' : 'is-active'}
          href="#1"
        >
          1
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#2">2</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#3">3</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#4">4</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#5">5</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#6">6</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#7">7</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#8">8</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#9">9</a>
      </li>
      <li className={`page-item ${currentPage === totalPagePages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => onPageChange(1)}
          aria-disabled={currentPage === totalPagePages ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
