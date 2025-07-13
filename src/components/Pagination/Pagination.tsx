type Props = {
  total: number;
  currentPage: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  itemsPerPage = 5,
  currentPage,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <ul className="pagination">
      <li className={currentPage !== 1 ? 'page-item' : 'page-item disabled'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;

        return (
          <li
            className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
            value={pageNum}
            key={pageNum}
            onClick={() => {
              onPageChange(pageNum);
            }}
          >
            <a data-cy="pageLink" className="page-link" href={`#${pageNum}`}>
              {pageNum}
            </a>
          </li>
        );
      })}
      <li
        className={
          currentPage !== totalPages ? 'page-item' : 'page-item disabled'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage !== totalPages) {
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
