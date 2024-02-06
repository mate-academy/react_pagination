type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  onPageChange: () => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(
      <li className={currentPage === i
        ? 'page-item active'
        : 'page-item'}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li className={currentPage === 1
        ? 'page-item disabled'
        : 'page-item'}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1
            ? 'true'
            : 'false'}
          onClick={() => (
            (currentPage > 1)
            && setCurrentPage(currentPage - 1))}
        >
          «
        </a>
      </li>

      {pages}

      <li className={currentPage === totalPages
        ? 'page-item disabled'
        : 'page-item'}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages
            ? 'true'
            : 'false'}
          onClick={() => (
            (currentPage < totalPages)
            && setCurrentPage(currentPage + 1))}
        >
          »
        </a>
      </li>
    </ul>
  );
};
