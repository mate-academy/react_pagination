import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 1,
  currentPage,
  onPageChange,
}) => {
  const amountOfCells = Math.ceil(total / perPage);
  const cells = getNumbers(1, amountOfCells);

  return (
    <ul className="pagination">
      <li className={
        cn('page-item', { disabled: currentPage === 1 })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage === 1) {
              return;
            }

            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {cells.map(cell => (
        <li
          className={cn('page-item', { active: currentPage === cell })}
          key={cell}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${cell}`}
            onClick={(): void => onPageChange(cell)}
          >
            {cell}
          </a>
        </li>
      ))}

      <li className={
        cn('page-item', { disabled: currentPage === amountOfCells })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountOfCells}
          onClick={() => {
            if (currentPage >= amountOfCells) {
              return;
            }

            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
