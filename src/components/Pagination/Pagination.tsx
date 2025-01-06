import cn from 'classnames';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
  onPageClick: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  perPage,
  onPageClick,
}) => {
  const visiblePages = Math.ceil(total / perPage);
  const arrVisiblePages = Array.from(
    { length: visiblePages },
    (_, index) => index + 1,
  );

  const prevPageDisabled = currentPage === 1;
  const nextPageDisabled = currentPage === visiblePages;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: prevPageDisabled })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevPageDisabled}
          onClick={() => currentPage > 1 && onPageClick(currentPage - 1)}
        >
          «
        </a>
      </li>

      {arrVisiblePages.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: nextPageDisabled })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextPageDisabled}
          onClick={() =>
            currentPage < visiblePages && onPageClick(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
