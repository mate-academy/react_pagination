import { pagesArray } from '../../utils';
import { Link } from 'react-router-dom';

interface PaginationType {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// total - загальна кількісьть елементів
// perPage - кількість елементів на сторінці
// currentPage = 1 - //кількість сторінок яка може бути

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
}: PaginationType) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pagesCountArray: number[] = pagesArray(pagesAmount);

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <Link
          to={`/?page=${currentPage - 1}&perPage=${perPage}`}
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </Link>
      </li>

      {pagesCountArray.map(page => (
        <li
          className={page === currentPage ? 'page-item active' : 'page-item'}
          key={page}
        >
          <Link
            to={`/?page=${page}&perPage=${perPage}`}
            data-cy="pageLink"
            className="page-link"
          >
            {page}
          </Link>
        </li>
      ))}
      <li
        className={
          currentPage === pagesCountArray.length
            ? 'page-item disabled'
            : 'page-item'
        }
      >
        <Link
          to={`/?page=${currentPage < pagesAmount ? currentPage + 1 : pagesAmount}&perPage=${perPage}`}
          data-cy="nextLink"
          className="page-link"
          aria-disabled={
            currentPage === pagesCountArray.length ? 'true' : 'false'
          }
        >
          »
        </Link>
      </li>
    </ul>
  );
};
