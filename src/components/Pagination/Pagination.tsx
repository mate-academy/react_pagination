import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number,
  onPageChange: (num: number) => void,
  perPage: number,
  total: number,
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  perPage,
  total,
  onPageChange,
}) => {
  const quantityPagination = Math.ceil(total / perPage);
  const paginations = getNumbers(1, quantityPagination);

  const onPrevClick = () => (currentPage > 1
    ? onPageChange(currentPage - 1) : onPageChange(1));

  const onNextClick = () => (currentPage < quantityPagination
    ? onPageChange(currentPage + 1) : onPageChange(quantityPagination));

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={onPrevClick}
        >
          «
        </a>
      </li>

      {paginations.map(pagination => (
        <li
          className={classNames('page-item',
            { active: currentPage === pagination })}
          key={pagination}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pagination}`}
            onClick={() => onPageChange(pagination)}
          >
            {pagination}
          </a>
        </li>
      ))}

      <li className={classNames('page-item',
        { disabled: currentPage === quantityPagination })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === quantityPagination}
          onClick={onNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
