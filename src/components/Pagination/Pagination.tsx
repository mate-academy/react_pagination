import classNames from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (newPage: number): void => {
    if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => handlePageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {Array.from({ length: totalPages }).map((_, index) => (
        <li
          key={index}
          className={classNames('page-item', {
            active: currentPage === index + 1,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => handlePageChange(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
