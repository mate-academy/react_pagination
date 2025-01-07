import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const pagesNumbers = getNumbers(1, pages);

  return (
    <>
      <ul className="pagination">
        <li
          className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pagesNumbers.map(page => (
          <li
            key={page}
            className={currentPage === page ? 'page-item active' : 'page-item'}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={currentPage !== pages ? 'page-item' : 'page-item disabled'}
          onClick={() => currentPage !== pages && onPageChange(currentPage + 1)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
