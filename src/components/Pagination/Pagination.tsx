import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const lastPage = Math.ceil(total / perPage);

  const pageNumbers: number[] = [];

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const handlePageChange =
    (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (page >= 1 && page <= lastPage) {
        onPageChange(page);
      }
    };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={classNames('page-item', {
            active: currentPage === pageNumber,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={handlePageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
