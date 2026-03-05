import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const onLastElement = totalPages === currentPage;
  const onFirstElement = 1 === currentPage;

  return (
    <ul className="pagination">
      <li className={`page-item ${onFirstElement ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={onFirstElement}
          onClick={() => {
            if (!onFirstElement) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {getNumbers(1, totalPages).map(item => (
        <li
          key={item}
          className={`page-item ${item === currentPage ? 'active' : ''}`}
          onClick={() => {
            if (currentPage !== item) {
              onPageChange(item);
            }
          }}
        >
          <a data-cy="pageLink" className="page-link" href={`#${item}`}>
            {item}
          </a>
        </li>
      ))}

      <li className={`page-item ${onLastElement ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={onLastElement}
          onClick={() => {
            if (!onLastElement) {
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
