interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const paginationArray = [];

  const pages = Math.ceil(total / perPage);

  for (let i = 1; i <= pages; i += 1) {
    paginationArray.push(i);
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {paginationArray.map(item => (
        <li className={`page-item ${currentPage === item && 'active'}`}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => {
              onPageChange(item);
            }}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === pages && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== pages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
