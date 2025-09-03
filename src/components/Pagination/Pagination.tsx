type ComponentProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: ComponentProps) => {
  const numPages = Math.ceil(total / perPage);

  const pages: number[] = [];

  for (let i = 0; i < numPages; i++) {
    pages.push(i + 1);
  }

  const items = [];

  for (
    let i = (currentPage - 1) * perPage + 1;
    i <= Math.min(currentPage * perPage, total);
    i++
  ) {
    items.push({ id: i, text: `Item ${i}` });
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={`${currentPage === 1 || numPages === 0 ? 'disabled' : ''}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={
              currentPage === 1 || numPages === 0 ? 'true' : 'false'
            }
            onClick={event => {
              event.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => {
          return (
            <li
              key={page}
              className={`${page === currentPage ? 'active' : ''}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => {
                  if (page !== currentPage && page >= 1 && page <= numPages) {
                    onPageChange(page);
                  }
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={`${currentPage === numPages || numPages === 0 ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === numPages || numPages === 0 ? 'true' : 'false'
            }
            onClick={event => {
              event.preventDefault();
              if (currentPage < numPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => {
          return (
            <li key={item.id} data-cy="item">
              {item.text}
            </li>
          );
        })}
      </ul>
    </>
  );
};
