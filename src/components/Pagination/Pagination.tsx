import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn({ 'page-item': true, disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, lastPage).map((value: number) => (
        <li
          className={cn({ 'page-item': true, active: value === currentPage })}
          key={value}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${value}`}
            onClick={() => onPageChange(value)}
          >
            {value}
          </a>
        </li>
      ))}
      <li
        className={cn({
          'page-item': true,
          disabled: currentPage === lastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={() => {
            if (currentPage !== lastPage) {
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
