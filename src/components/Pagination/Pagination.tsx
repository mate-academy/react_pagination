type Props = {
  total: number;
  currentPage: number;
  pages: number[];
  perPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  pages,
  perPage,
  onPageChange,
}) => {
  const pagesAmount = pages;
  const numberOfPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage < 2 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          // aria-disabled="true"
          aria-disabled={currentPage < 2 && 'true'}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pagesAmount.map(page => {
        return (
          <li
            key={page}
            className={`page-item ${page === currentPage && 'active'}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li className={`page-item ${currentPage >= numberOfPages && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          // aria-disabled="false
          aria-disabled={currentPage < numberOfPages ? 'false' : 'true'}
          onClick={e => {
            e.preventDefault();
            if (currentPage < numberOfPages) {
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
