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
  onPageChange = () => {},
}) => {
  const totalPages = Math.ceil(total / +perPage);
  const numberOfPages = [];

  for (let i = 1; i <= totalPages; i += 1) {
    numberOfPages.push(i);
  }

  const isFirstPage = (): boolean => {
    if (currentPage === 1) {
      return true;
    }

    return false;
  };

  const isLastPage = (): boolean => {
    if (currentPage === totalPages) {
      return true;
    }

    return false;
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: isFirstPage() },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage()}
          onClick={() => !isFirstPage() && onPageChange(currentPage - 1)}
        >
          «
        </a>
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
        { disabled: isLastPage() },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage()}
          onClick={() => !isLastPage() && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
