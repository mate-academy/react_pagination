import cn from 'classnames';

type Props = {
  visiblePages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export const Pagination: React.FC<Props> = ({
  visiblePages,
  currentPage,
  onPageClick,
  onPrevClick,
  onNextClick,
}) => {
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
          onClick={onPrevClick}
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
          onClick={onNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
