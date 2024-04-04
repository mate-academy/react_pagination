interface IPaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const onPreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'page-item active' : 'page-item'}
        >
          <a data-cy="pageLink" className="page-link" href={`#${i}`}>
            {i}
          </a>
        </li>,
      );
    }

    return pages;
  };

  return (
    <>
      <ul className="pagination">
        <li className={isFirstPage ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={onPreviousPage}
            aria-disabled={isFirstPage}
          >
            «
          </a>
        </li>
        {renderPagination()}
        <li className={isLastPage ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={onNextPage}
            aria-disabled={isLastPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
