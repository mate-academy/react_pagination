interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { total, perPage, currentPage = 1, onPageChange } = props;

  const countPageLinks = Math.ceil(total / perPage);
  const pages = Array.from({ length: countPageLinks }, (_, index) => index + 1);

  const isFirst = currentPage === 1;
  const isLast = currentPage === countPageLinks;

  const handleChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    event.preventDefault();

    if (page !== currentPage && page >= 1 && page <= countPageLinks) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={isFirst ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirst}
            onClick={event => handleChange(event, currentPage - 1)}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={event => handleChange(event, page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={isLast ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLast}
            onClick={event => handleChange(event, currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
