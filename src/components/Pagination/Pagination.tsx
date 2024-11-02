import { getNumbers } from '../../utils';
import cn from 'classnames';


type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({ total, perPage, currentPage, onPageChange }) => {

  const pages: number[] = getNumbers(1, Math.ceil(total / perPage));

  const isLastPage = currentPage === pages.length;
  const isFirstPage = currentPage === 1;

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage <= 1 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => onPageChange(isFirstPage ? currentPage : currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li className={cn('page-item', { 'active': page === currentPage })} key={page}>
          <a data-cy="pageLink" className="page-link" href={`#${page}`} onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage >= pages.length && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => onPageChange(isLastPage ? currentPage : currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  )
};
