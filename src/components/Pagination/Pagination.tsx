import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  currentPage: number;
  items: string[];
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  items,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(items.length / perPage);

  const currentItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const paginationNumbers = getNumbers(1, totalPages);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: isPrevDisabled })}>
          <button
            data-cy="prevLink"
            className="page-link"
            onClick={(event) => {
              event.preventDefault();
              if (!isPrevDisabled) onPageChange(currentPage - 1);
            }}
            disabled={isPrevDisabled}
            aria-disabled={isPrevDisabled}
          >
            «
          </button>
        </li>
        {paginationNumbers.map(num => (
          <li
            key={num}
            className={cn('page-item', { active: currentPage === num })}
          >
            <button
              data-cy="pageLink"
              className="page-link"
              onClick={() => onPageChange(num)}
              aria-current={currentPage === num ? 'page' : undefined}
            >
              {num}
            </button>
          </li>
        ))}
        <li className={cn('page-item', { disabled: isNextDisabled })}>
          <button
            data-cy="nextLink"
            className="page-link"
            onClick={(event) => {
              event.preventDefault();
              if (!isNextDisabled) onPageChange(currentPage + 1);
            }}
            disabled={isNextDisabled}
            aria-disabled={isNextDisabled}
          >
            »
          </button>
        </li>
      </ul>
      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
