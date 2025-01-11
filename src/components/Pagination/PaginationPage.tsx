import classNames from 'classnames';
import { PaginationInterface } from './types';

export const PaginationPage = ({
  pagination,
}: {
  pagination: PaginationInterface;
}) => {
  const itemsValue = [];
  const countOfPage = Math.ceil(pagination.total / pagination.perPage);

  for (let i = 1; i <= countOfPage; i++) {
    itemsValue.push(
      <li
        key={i}
        className={classNames('page-item', {
          active: pagination.currentPage === i,
        })}
        onClick={() => pagination.onPageChange(i)}
      >
        <a data-cy="pageLink" className="page-link" href="#1">
          {i}
        </a>
      </li>,
    );
  }

  return itemsValue;
};
