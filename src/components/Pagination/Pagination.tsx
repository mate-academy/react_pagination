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
  const pageAmount = Math.ceil(total / perPage);

  return (
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
        {getNumbers(1, pageAmount).map(item => (
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
          'page-item', { disabled: currentPage > (pageAmount - 1) },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage > (pageAmount - 1) ? 'true' : 'false'}
            onClick={() => (
              currentPage <= (pageAmount - 1) && (
                onPageChange(currentPage + 1)
              )
            )}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsPerPage.map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};

Pagination.defaultProps = { currentPage: 1 };
