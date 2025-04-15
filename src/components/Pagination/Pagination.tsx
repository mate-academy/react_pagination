import cn from 'classNames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countPages = Math.ceil(total / perPage);
  const pages: number[] = [...Array(countPages)].map((_, i) => i + 1);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pages.map(pageNumber => {
        return (
          <li
            className={cn('page-item', { active: currentPage === pageNumber })}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${pageNumber}`}>
              {pageNumber}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item', { disabled: pages.length === currentPage })}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={pages.length === currentPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
