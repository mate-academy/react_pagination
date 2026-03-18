type Props = {
  total: number; // total number of items to paginate
  perPage: number; // number of items per page
  currentPage: number /* optional with 1 by default */;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const arrayPages = [];

  for (let i = 1; i < totalPages + 1; i++) {
    arrayPages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();
            if (currentPage === 1) {
              return;
            } else {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {arrayPages.map(page => (
        <li
          className={page === currentPage ? 'page-item active' : 'page-item'}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={event => {
              event.preventDefault();
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={
          currentPage === totalPages ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();
            if (currentPage === totalPages) {
              return;
            } else {
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
