import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfPageButtons = Math.ceil(total / perPage);

  const pageItemsArr = Array.from(Array(numberOfPageButtons), (_, i) => i + 1);

  const handleNextPage = () => {
    if (currentPage < numberOfPageButtons) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
        onClick={handlePreviousPage}
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

      {pageItemsArr.map(it => {
        return (
          <li
            onClick={() => currentPage !== it && onPageChange(it)}
            key={it}
            className={cn('page-item', { active: currentPage === it })}
          >
            <a data-cy="pageLink" className="page-link" href="#1">
              {it}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item', {
          disabled: currentPage === numberOfPageButtons,
        })}
        onClick={handleNextPage}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPageButtons}
        >
          »
        </a>
      </li>
    </ul>
  );
};
