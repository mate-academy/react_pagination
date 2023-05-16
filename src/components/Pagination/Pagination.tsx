import { Link } from 'react-router-dom';
import { getNumbers } from '../../utils';

interface PropsPagination {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total, perPage, currentPage, onPageChange,
}: PropsPagination) => {
  const numberOfPages = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === numberOfPages;
  const pageNaming = `/?page=${currentPage}&perPage=${perPage}`;

  return (
    <ul className="pagination">
      <li className={`page-item ${firstPage && 'disabled'}`}>
        <a
          href="prev"
          data-cy="prevLink"
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {getNumbers(1, numberOfPages).map(page => (
        <li className={`page-item ${currentPage === page && 'active'}`}>
          <Link
            to={pageNaming}
            onClick={() => onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
          >
            {page}
          </Link>
        </li>
      ))}

      <li className={`page-item ${lastPage && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="next"
          aria-disabled={lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>

  );
};
