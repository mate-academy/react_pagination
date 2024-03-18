import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttonsAll = Math.ceil(total / perPage);
  const buttonsCount = getNumbers(1, buttonsAll);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === buttonsAll;

  const handleClickFirstPage = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleClickLastPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: firstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={handleClickFirstPage}
          aria-disabled={firstPage}
        >
          «
        </a>
      </li>

      {buttonsCount.map(number => (
        <li
          className={cn('page-item', {
            active: number === currentPage,
          })}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={handleClickLastPage}
          aria-disabled={lastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
