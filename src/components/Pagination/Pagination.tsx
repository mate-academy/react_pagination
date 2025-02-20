import classNames from 'classnames';
import { getNumbers } from '../../utils';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const countLi = Math.ceil(total / perPage);
  const pageItem = getNumbers(1, countLi);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={
            currentPage === 1 ? () => {} : () => onPageChange(currentPage - 1)
          }
        >
          «
        </a>
      </li>
      {pageItem.map(item => (
        <li
          className={classNames('page-item', { active: item === currentPage })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={currentPage !== item ? () => onPageChange(item) : () => {}}
          >
            {item}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage >= pageItem.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage >= pageItem.length ? 'true' : 'false'}
          onClick={
            currentPage >= pageItem.length
              ? () => {}
              : () => onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
