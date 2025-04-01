type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage, //5
  currentPage,
  onPageChange = () => {},
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} `}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={`${currentPage === 1 ? 'true' : 'false'}`}
          onClick={
            currentPage > 1 ? () => onPageChange(currentPage - 1) : undefined
          }
        >
          «
        </a>
      </li>

      {pageList.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''} `}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === totalPages ? 'true' : 'false'}`}
          onClick={
            currentPage < totalPages
              ? () => onPageChange(currentPage + 1)
              : undefined
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
