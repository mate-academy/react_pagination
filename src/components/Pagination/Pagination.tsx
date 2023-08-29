import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const numberOfPages = [];

  for (let i = 1; i <= totalPages; i += 1) {
    numberOfPages.push(i);
  }

  const isFirstPage = currentPage === 1;

  const isLastPage = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: isFirstPage },
      )}
      >
        <button
          type="button"
          data-cy="prevLink"
          className="page-link"
          aria-disabled={isFirstPage}
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        >
          «
        </button>
      </li>
      {numberOfPages.map(page => (
        <li
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
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
      <li className={cn(
        'page-item',
        { disabled: isLastPage },
      )}
      >
        <button
          type="button"
          data-cy="nextLink"
          className="page-link"
          aria-disabled={isLastPage}
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        >
          »
        </button>
      </li>
    </ul>
  );
};
