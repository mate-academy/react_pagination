type Props = {
  total: number,
  perPage: number,
  currentPage?: number,
  onPageChange(page: number): void,
  getNumbers(a: number, b: number): number[],
  visibleItems: number[],
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  getNumbers,
  visibleItems,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <>
      <ul className="pagination">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={event => {
              event.preventDefault();

              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li className={`page-item${currentPage === page ? ' active' : ''}`} key={page}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={event => {
                event.preventDefault();

                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={`page-item${currentPage === Math.ceil(total / perPage) ? ' disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === Math.ceil(total / perPage)}
            onClick={event => {
              event.preventDefault();

              if (currentPage !== Math.ceil(total / perPage)) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
