import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const countPage = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage <= 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage <= 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {getNumbers(1, countPage).map(numberPage => (
        <li
          key={numberPage}
          className={cn(
            'page-item',
            { active: numberPage === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${numberPage}`}
            onClick={() => numberPage !== currentPage
              && onPageChange(numberPage)}
          >
            {numberPage}
          </a>
        </li>
      ))}
      <li className={cn(
        'page-item',
        { disabled: currentPage === countPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPage}
          onClick={() => currentPage !== countPage
            && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
