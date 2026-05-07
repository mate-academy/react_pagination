type Prop = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Prop) {
  const pageItem = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li
        className={`page-item
        ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage === 1) {
              return;
            }

            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {Array.from({ length: pageItem }).map((_, i) => (
        <li
          className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
          key={i + 1}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i + 1}`}
            onClick={event => {
              event.preventDefault();
              if (i + 1 !== currentPage) {
                onPageChange(i + 1);
              }
            }}
          >
            {i + 1}
          </a>
        </li>
      ))}

      <li
        className={`page-item
        ${currentPage === pageItem ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageItem}
          onClick={event => {
            event.preventDefault();
            if (currentPage === pageItem) {
              return;
            }

            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
}
