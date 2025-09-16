import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  items: string[];
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  items,
}) => {
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>

        {getNumbers(1, Math.ceil(total / perPage)).map(n => (
          <li
            key={n}
            className={`page-item ${currentPage === n ? 'active' : ''}`}
          >
            <a
              onClick={() => {
                onPageChange(n);
              }}
              data-cy="pageLink"
              className="page-link"
              href={`#${n}`}
            >
              {n}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === Math.ceil(total / perPage) ? 'disabled' : ''}`}
        >
          <a
            onClick={() => {
              if (currentPage < Math.ceil(total / perPage)) {
                onPageChange(currentPage + 1);
              }
            }}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === Math.ceil(total / perPage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.slice(startIndex, endIndex).map(n => (
          <li key={n} data-cy="item">
            {n}
          </li>
        ))}
      </ul>
    </>
  );
};
