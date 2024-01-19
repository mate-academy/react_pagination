import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  itemsCount: number,
  start: number,
  end: number,
  itemsPerPage: number,
  currentPage: number,
  onPageChange: (arg: number) => void,
}

export const Pagination = ({
  itemsCount,
  start,
  end,
  itemsPerPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const pages = getNumbers(1, pagesCount);

  const getItemsForPage = () => {
    return getNumbers(start, end).map(n => `Item ${n}`);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= pagesCount) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 && 'true'}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={cn(
              'page-item',
              { active: currentPage === page },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn(
            'page-item',
            { disabled: currentPage === pagesCount },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount && 'true'}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {getItemsForPage().map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
