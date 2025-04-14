type Props = {
  pages: number[];
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  nextPage,
  prevPage,
  onPageChange,
}) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`${page}`}
            onClick={event => {
              event.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === pages.length ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
