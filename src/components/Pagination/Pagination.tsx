import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (selectedPage: number) => void
}

export const Pagination = (props: PaginationProps) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const pages = Math.ceil(total / perPage);
  const amountOfPages = getNumbers(1, pages);
  const isFirstPage = currentPage === 1;
  const isLastPage = pages === currentPage;

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {amountOfPages.map(page => (
        <li
          className={`page-item ${page === currentPage && 'active'}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${isLastPage && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (currentPage !== pages) {
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
