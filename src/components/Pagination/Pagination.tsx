import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: string[],
  currentPage?: number,
  onPageChange(page: number): void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => (
  <>
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage < 2 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage < 2 ? 'true' : 'false'}
          onClick={() => (
            currentPage >= 2 && (
              onPageChange(currentPage - 1)
            )
          )}
        >
          «
        </a>
      </li>
      {getNumbers(1, total).map(item => (
        <li
          className={
            classNames('page-item', { active: currentPage === item })
          }
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item', { disabled: currentPage > (total - 1) },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage > (total - 1) ? 'true' : 'false'}
          onClick={() => (
            currentPage <= (total - 1) && (
              onPageChange(currentPage + 1)
            )
          )}
        >
          »
        </a>
      </li>
    </ul>
    <ul>
      {perPage.map(item => (
        <li data-cy="item">{item}</li>
      ))}
    </ul>
  </>
);

Pagination.defaultProps = { currentPage: 1 };
