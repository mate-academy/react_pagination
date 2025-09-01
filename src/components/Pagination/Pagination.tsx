interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = total === 0 ? 0 : Math.min(currentPage * perPage, total);

  return (
    <div>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {start} - {end} of {total})
      </p>

      <ul className="pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={
              currentPage > 1 ? () => onPageChange(currentPage - 1) : undefined
            }
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={
                page !== currentPage ? () => onPageChange(page) : undefined
              }
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === pages.length ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length ? 'true' : 'false'}
            onClick={
              currentPage < pages.length
                ? () => onPageChange(currentPage + 1)
                : undefined
            }
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
