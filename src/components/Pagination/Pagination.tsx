import cn from 'classnames';
import { getNumbers } from '../../utils';

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
  const numberOfPageItems = Math.ceil(total / perPage);

  const paginations = getNumbers(1, numberOfPageItems);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < numberOfPageItems) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {paginations.map(pagination => {
        return (
          <li
            key={pagination}
            className={cn('page-item', { active: currentPage === pagination })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={() => onPageChange(pagination)}
            >
              {pagination}
            </a>
          </li>
        );
      })}
      <li className={cn('page-item',
        { disabled: currentPage === numberOfPageItems })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPageItems}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
