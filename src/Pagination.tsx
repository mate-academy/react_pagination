type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = props => {
  const totalPages = Math.ceil(props.total / props.perPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      <li
        className={props.currentPage === 1 ? 'page-item disabled' : 'page-item'}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={props.currentPage === 1}
          onClick={event => {
            event.preventDefault();

            if (props.currentPage > 1) {
              props.onPageChange(props.currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={
            page === props.currentPage ? 'page-item active' : 'page-item'
          }
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={event => {
              event.preventDefault();
              props.onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={
          props.currentPage === totalPages ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={props.currentPage === totalPages}
          onClick={event => {
            event.preventDefault();

            if (props.currentPage < totalPages) {
              props.onPageChange(props.currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
