interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  items: string[];
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  items,
  onPageChange,
}) => {
  const countPages =
    total % perPage === 0 ? total / perPage : Math.ceil(total / perPage);

  const pages = Array.from({ length: countPages }, (_, i) => i + 1);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
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
        {pages.map((value, index) => (
          <li
            key={index}
            className={`page-item ${value === currentPage ? 'active' : ''}`}
            onClick={() => {
              onPageChange(value);
            }}
          >
            <a data-cy="pageLink" className="page-link" href="#1">
              {value}
            </a>
          </li>
        ))}
        <li
          className={`page-item
          ${currentPage === countPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === countPages}
            onClick={e => {
              e.preventDefault();

              if (currentPage < countPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map((numberOfPage, index) => (
          <li key={index} data-cy="item">
            {numberOfPage}
          </li>
        ))}
      </ul>
    </>
  );
};
