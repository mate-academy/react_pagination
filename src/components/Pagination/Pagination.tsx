import classNames from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total, perPage, currentPage = 1, onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: currentPage === 1 })}
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
      {[...Array(totalPages)].map((_, index) => {
        const uniqueKey = `${index} - ${Math.random()}`;

        return (
          <li
            key={uniqueKey}
            className={classNames('page-item',
              { active: currentPage === (index + 1) })}
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
        );
      })}

      <li className={classNames('page-item',
        { disabled: currentPage === totalPages })}
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
