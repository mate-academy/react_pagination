import { PaginationItem } from '../PaginationItem';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const itemsPerPage = Math.ceil(total / perPage);

  const pages = Array.from({ length: itemsPerPage }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={`${currentPage === 1}`}
          onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map((page, index) => {
        return (
          <PaginationItem
            page={page}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            key={index}
          />
        );
      })}
      <li
        className={`page-item ${currentPage === itemsPerPage ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === itemsPerPage}`}
          onClick={() =>
            currentPage !== itemsPerPage && setCurrentPage(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
