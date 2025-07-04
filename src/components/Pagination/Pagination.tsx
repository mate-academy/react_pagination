import cn from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number, newPerPage: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <ul className="pagination">
        <li
          data-cy="prevLink"
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={() =>
            currentPage > 1 && onPageChange(currentPage - 1, perPage)
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li
            data-cy="pageLink"
            className={cn('page-item', { active: index + 1 === currentPage })}
            key={index}
          >
            <a
              className="page-link"
              href={`#${index + 1}`}
              onClick={() => onPageChange(index + 1, perPage)}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li
          data-cy="nextLink"
          className={cn('page-item', { disabled: currentPage === totalPages })}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1, perPage)
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="true"
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
