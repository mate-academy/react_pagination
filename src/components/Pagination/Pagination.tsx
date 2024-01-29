import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

const getNumberOfPages = (
  total: number,
  perPage: number,
): number[] => {
  const allPages: number[] = [];

  for (let i = 1; i <= total; i += 1) {
    allPages.push(i);
  }

  return allPages.slice(0, Math.ceil(allPages.length / perPage));
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = getNumberOfPages(total, perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.max(...totalPages);

  const onPageLinkClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const onPrevLinkClick = (page: number) => {
    if (!isFirstPage) {
      onPageChange(page - 1);
    }
  };

  const onNextLinkClick = (page: number) => {
    if (!isLastPage) {
      onPageChange(page + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: isFirstPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => onPrevLinkClick(currentPage)}
        >
          «
        </a>
      </li>
      {totalPages.map(page => (
        <li
          key={page}
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageLinkClick(page)}
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
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => onNextLinkClick(currentPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
