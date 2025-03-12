export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  items,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {' '}
      <ul className="pagination">
      <li
  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
  data-cy="nextItem"
>
  <a
    data-cy="nextLink"
    className="page-link"
    href="#next"
    aria-disabled={currentPage === totalPages}
    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
  >
    »
  </a>
</li>
        {pages.map(page => {
          return (
            <li
              key={page}
              className={
                currentPage === page ? 'page-item active' : 'page-item'
              }
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={'#' + page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
       <li
  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
  data-cy="prevItem"
>
  <a
    data-cy="prevLink"
    className="page-link"
    href="#prev"
    aria-disabled={currentPage === 1}
    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
  >
    «
  </a>
</li>

      </ul>
      <ul>
        <ul>
          {items
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .map((item, index) => (
              <li key={index} data-cy="item">
                {item}
              </li>
            ))}
        </ul>
      </ul>{' '}
    </>
  );
};
