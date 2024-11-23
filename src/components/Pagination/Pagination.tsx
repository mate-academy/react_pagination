type PaginationType = {
  total?: number;
  perPage?: number;
  currentPage?: number;
  pages: string[][];
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage = 1,
  pages,
  onPageChange,
}: PaginationType) => {
  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 && 'disabled'}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {pages.map((_, index) => {
          return (
            <li
              className={`page-item ${currentPage === index + 1 && 'active'}`}
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${index + 1}`}
              >
                {index + 1}
              </a>
            </li>
          );
        })}

        <li
          className={`page-item ${currentPage === pages.length && 'disabled'}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {pages[currentPage - 1].map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};
