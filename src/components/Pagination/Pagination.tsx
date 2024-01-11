interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(
        <li
          key={i}
          className={i === currentPage ? 'page-item active' : 'page-item'}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pages;
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          onClick={() => handlePageChange(currentPage - 1)}
          ariaria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {renderPageNumbers()}
      <li className={`page-item ${currentPage !== totalPages ? '' : 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          onClick={() => handlePageChange(currentPage + 1)}
          ariaria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
