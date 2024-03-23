import { getNumbers } from '../../utils';

export const Pagination: React.FC<{
  totalPages: number;
  currentPage: number;
  onPageChange: any;
}> = ({ currentPage = 1, totalPages, onPageChange }) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {getNumbers(1, totalPages).map(n => (
        <li
          key={n}
          className={`page-item ${currentPage === n ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => {
              if (n !== currentPage) {
                onPageChange(n);
              }
            }}
          >
            {n}
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
          onClick={() => {
            if (currentPage !== totalPages) {
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
