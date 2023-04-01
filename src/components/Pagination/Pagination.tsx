import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  itemsPerPage: string[],
  currentPage?: number,
  onPageChange(page: number): void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  itemsPerPage,
  currentPage = 1,
  onPageChange,
}) => {
  const moveLeft = () => (
    currentPage >= 2 && (
      onPageChange(currentPage - 1)
    )
  );

  const moveRight = () => (
    currentPage <= (Math.ceil(total / perPage) - 1) && (
      onPageChange(currentPage + 1)
    )
  );

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: currentPage < 2 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage < 2 ? 'true' : 'false'}
            onClick={moveLeft}
          >
            «
          </a>
        </li>
        {getNumbers(1, Math.ceil(total / perPage)).map(item => (
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
          'page-item', {
            disabled: currentPage > (Math.ceil(total / perPage) - 1),
          },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage > (Math.ceil(total / perPage) - 1) ? 'true' : 'false'
            }
            onClick={moveRight}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsPerPage.map(item => (
          <li
            data-cy="item"
            key={item}
          >{item}</li>
        ))}
      </ul>
    </>
  );
};

Pagination.defaultProps = { currentPage: 1 };
