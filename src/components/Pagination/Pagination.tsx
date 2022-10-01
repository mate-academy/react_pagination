import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / perPage);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pagesAmount;

  const changePage = (n: number) => {
    if (n !== currentPage) {
      onPageChange(n);
    }
  };

  const setPrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const setNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item',
        { disabled: isPrevDisabled })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={setPrevPage}
        >
          «
        </a>
      </li>

      {getNumbers(1, pagesAmount).map(n => (
        <li
          className={cn('page-item',
            { active: n === currentPage })}
          key={n}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => changePage(n)}
          >
            {n}
          </a>
        </li>
      ))}

      <li className={cn('page-item',
        { disabled: isNextDisabled })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={setNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
