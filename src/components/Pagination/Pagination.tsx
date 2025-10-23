interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  displayedItems: number[];
}

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  displayedItems,
}: Props) => {
  const totalPages: number = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
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
        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              onClick={() => onPageChange(i + 1)}
              href={'#' + (i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {displayedItems.map((item, i) => (
          <li data-cy="item" key={i}>
            Item {item}
          </li>
        ))}
      </ul>
    </>
  );
};
