import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => { },
}) => {
  const pages = Math.ceil(total / perPage);
  const isFirstPageSelected = currentPage === 1;
  const isLastPageSelected = currentPage === pages;

  const getClassName = (condition: boolean) => cn('page-item',
    { disabled: condition });

  return (
    <ul className="pagination">
      <li className={getClassName(isFirstPageSelected)}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageSelected}
          onClick={() => !isFirstPageSelected && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getNumbers(1, pages).map(page => (
        <li
          key={page}
          className={cn('page-item',
            { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(event) => {
              event.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={getClassName(isLastPageSelected)}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageSelected}
          onClick={() => !isLastPageSelected
            && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
