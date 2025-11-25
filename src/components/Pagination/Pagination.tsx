import cn from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const isLastPage: boolean = currentPage === totalPages;
  const isFirstPage: boolean = currentPage === 1;

  return (
    <ul className="pagination">
      <li
        onClick={() => {
          if (!isFirstPage) {
            onPageChange(currentPage - 1);
          }
        }}
        className={cn('page-item', { disabled: isFirstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>
      {totalPages >= 1 &&
        [...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={cn('page-item', { active: currentPage === index + 1 })}
            onClick={() => {
              if (currentPage !== index + 1) {
                onPageChange(index + 1);
              }
            }}
          >
            <a data-cy="pageLink" className="page-link" href={`#${index + 1}`}>
              {index + 1}
            </a>
          </li>
        ))}

      <li
        onClick={() => {
          if (!isLastPage) {
            onPageChange(currentPage + 1);
          }
        }}
        className={cn('page-item', { disabled: isLastPage })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
