import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (n: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttonsAmount = Math.ceil(total / perPage);
  const buttons = getNumbers(1, buttonsAmount);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {buttons.map(n => (
        <li key={n} className={cn('page-item', { active: n === currentPage })}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: currentPage === buttonsAmount })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === buttonsAmount ? 'true' : 'false'}
          onClick={() => {
            if (currentPage < buttonsAmount) {
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
