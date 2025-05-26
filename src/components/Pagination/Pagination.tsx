import cn from 'classnames';
import { getNumbers } from '../../utils';
import { INITIAL_PAGE, INITIAL_PER_PAGE, TOTAL_ITEMS } from '../../constants';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Pagination = () => {
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const currentPage = +(searchParams.get('page') || INITIAL_PAGE);
  const perPage = +(searchParams.get('perPage') || INITIAL_PER_PAGE);

  const pages = getNumbers(INITIAL_PAGE, Math.ceil(TOTAL_ITEMS / perPage));
  const isFirstPage = currentPage === INITIAL_PAGE;
  const isLastPage = currentPage === pages.at(-1);

  const getSearchPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());

    return { search: params.toString() };
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <Link
          data-cy="prevLink"
          className="page-link"
          to={!isFirstPage ? getSearchPage(currentPage - 1) : { search }}
          aria-disabled={isFirstPage}
        >
          «
        </Link>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={getSearchPage(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        </li>
      ))}

      <li className={cn('page-item', { disabled: isLastPage })}>
        <Link
          data-cy="nextLink"
          className="page-link"
          to={!isLastPage ? getSearchPage(currentPage + 1) : { search }}
          aria-disabled={isLastPage}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
