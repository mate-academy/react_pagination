import { PaginationType } from '../../types/PaginationType';

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationType) => {
  const totalPages = Math.ceil(total / perPage);
  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#"
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
      {pagesArr.map(p => (
        <li
          className={`page-item ${currentPage === p ? 'active' : ''}`}
          key={p}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#"
            onClick={e => {
              e.preventDefault();
              if (p !== currentPage) {
                onPageChange(p);
              }
            }}
          >
            {p}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#"
          aria-disabled={currentPage === totalPages}
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
  );
};

// total — всего элементов
// perPage — элементов на страницу
// currentPage — текущая страница
// onPageChange — коллбэк для смены страницы
