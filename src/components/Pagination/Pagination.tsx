import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number,
  onPageChange: (page: number) => void,
  perPage: number,
  currentPage: number,
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const MAX_PAGE = Math.ceil(total / perPage);
  const MIN_PAGE = 1;
  const items = getNumbers(1, total)
    .map((n: number) => `Item ${n}`);

  const pages = new Array(MAX_PAGE)
    .fill(0).map((page, pageIndex) => {
      let nextPage = page;

      nextPage = pageIndex + 1;

      return nextPage;
    });

  const isFirstPage = currentPage === MIN_PAGE;
  const isLastPage = currentPage === MAX_PAGE;
  const bottomRange = (currentPage - 1) * perPage;
  const topRange = currentPage * perPage;

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            className={`page-item ${currentPage === page && 'active'}`}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              { page }
            </a>
          </li>
        ))}
        <li className={`page-item ${isLastPage && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .slice(bottomRange, topRange)
          .map((item: string) => (
            <li data-cy="item">{item}</li>
          ))}
      </ul>
    </>
  );
};
