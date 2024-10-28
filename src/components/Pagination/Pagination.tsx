import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 1,
  currentPage = 1,
  onPageChange,
}) => {
  const countOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, countOfPages);

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const prevPageClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (currentPage < countOfPages) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            prevPageClick();
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              handlePageClick(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === countOfPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countOfPages ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            nextPageClick();
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
