type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
                                              currentPage,
                                              totalPages,
                                              onPageChange,
                                            }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick =
    (page: number) =>
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (page === currentPage) return;     // 👈 не дергаем коллбек для текущей страницы
        onPageChange(page);
      };

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      {/* Prev */}
      <a
        data-cy="prev"
        className={`page-link ${canPrev ? '' : 'is-disabled'}`}
        href={`#${currentPage - 1}`}
        aria-disabled={!canPrev}
        onClick={(e) => {
          e.preventDefault();
          if (canPrev) onPageChange(currentPage - 1);
        }}
      >
        Prev
      </a>

      {/* Next */}
      <a
        data-cy="next"
        className={`page-link ${canNext ? '' : 'is-disabled'}`}
        href={`#${currentPage + 1}`}
        aria-disabled={!canNext}
        onClick={(e) => {
          e.preventDefault();
          if (canNext) onPageChange(currentPage + 1);
        }}
      >
        Next
      </a>

      {/* Numbered pages */}
      <ul className="pagination-list">
        {pages.map((page) => (
          <li key={page}>
            <a
              data-cy="pageLink"
              className={`page-link ${page === currentPage ? 'is-current' : ''}`}
              href={`#${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-disabled={page === currentPage}
              onClick={handlePageClick(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
