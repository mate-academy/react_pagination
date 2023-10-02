type Props = {
  total: number;
  perPage: number;
  currentPage:number;
  onPageChange:(page:number) => void;
};

export const Pagination:React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 0}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage - 1 < 0) {
              return;
            }

            onPageChange(Number(currentPage - 1));
          }}
        >
          «
        </a>
      </li>
      {new Array(pagesCount).fill(undefined)
        .map((key, pageIndex) => (
          <li className={`page-item ${(pageIndex === currentPage ? 'active' : '')}`}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageIndex + 1}`}
              key={key}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Number(pageIndex));
              }}
            >
              {pageIndex + 1}
            </a>
          </li>
        ))}
      <li className={`page-item ${currentPage + 1 === pagesCount ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage + 1 === pagesCount}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage + 1 === pagesCount) {
              return;
            }

            onPageChange(Number(currentPage + 1));
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
