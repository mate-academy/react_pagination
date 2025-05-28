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
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handleChangePage = (pageNumber: number) => {
    if (
      pageNumber !== currentPage &&
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      onPageChange(pageNumber);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isPrevDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={() => !isPrevDisabled && handleChangePage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item', {
            active: pageNumber === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => handleChangePage(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: isNextDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={() => !isNextDisabled && handleChangePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
