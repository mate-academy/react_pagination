import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}) => {
  const maxPages = Math.ceil(total / perPage);
  const leftDisabled = currentPage === 1;
  const rightDisabled = currentPage === maxPages;

  const pages = getNumbers(1, maxPages);

  return (
    <ul className="pagination">
      {/* eslint-disable-next-line prettier/prettier */}
      <li className={cn('page-item', { disabled: leftDisabled })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={leftDisabled ? 'true' : 'false'}
          onClick={() => {
            if (!leftDisabled) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={cn('page-item', {
            // eslint-disable-next-line prettier/prettier
            active: page === currentPage,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              if (currentPage !== page) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}
      {/* eslint-disable-next-line prettier/prettier */}
      <li className={cn('page-item', { disabled: rightDisabled })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={rightDisabled ? 'true' : 'false'}
          onClick={() => {
            if (!rightDisabled) {
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
