import cn from 'classnames';

type Props = {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const count = (total % +perPage === 0)
    ? total / +perPage
    : Math.floor(total / +perPage) + 1;

  const pagesArray = Array
    .from({ length: count }, (_, index) => index + 1);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pagesArray.map((page) => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
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
        className={cn('page-item', { disabled: currentPage === count })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === count}
          onClick={() => {
            if (currentPage < count) {
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
