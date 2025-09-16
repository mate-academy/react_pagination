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
  currentPage = 1,
  onPageChange,
  items,
}) => {
  const firstItemIndex = total > 0 ? (currentPage - 1) * perPage : 0;
  const lastItemIndex = Math.min(currentPage * perPage, total);

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
              onClick={e => {
                e.preventDefault();
                if (n !== currentPage) {
                  onPageChange(n);
                }
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
        {items.slice(firstItemIndex, lastItemIndex).map(n => (
          <li key={n} data-cy="item">
            {n}
          </li>
        ))}
      </ul>
    </>
  );
};
