/* eslint-disable array-callback-return */
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  perPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage)).map(page => page);
  const handlePageChange = (page: number) => {
    if (
      page !== currentPage
      && page > 0
      && page <= pages.length
    ) {
      onPageChange(page);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={cn('page-item', {
              active: page === currentPage,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={
                () => handlePageChange(page)
              }
            >
              {`${page}`}
            </a>
          </li>
        ))}

        <li className={cn('page-item', {
          disabled: currentPage === pages.length,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
