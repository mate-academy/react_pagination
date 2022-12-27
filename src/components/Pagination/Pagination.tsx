import { FC } from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  firstItem: number;
  lastItem: number;
  items: string[];
  onPageChange: (page: number | string) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  firstItem,
  lastItem,
  items,
  onPageChange,
}) => {
  const recentItems = items.slice(firstItem - 1, lastItem);

  const paginationNumber = Math.ceil(total / perPage);

  const pageList = getNumbers(1, paginationNumber);

  const isPrevEnabled = currentPage > 1;
  const isNextEnabled = currentPage < paginationNumber;

  return (
    <>
      <ul className="Pagination">
        <li
          key="prev"
          className={cn(
            'page-item',
            {
              disabled:
              !isPrevEnabled,
            },
          )}
        >
          <a
            href="#prev"
            className="page-link"
            data-cy="prevLink"
            aria-disabled={
              isPrevEnabled
                ? 'false'
                : 'true'
            }
            onClick={() => isPrevEnabled && onPageChange('prev')}
            id="prev"
          >
            «
          </a>
        </li>
        {
          pageList.map(page => (
            <li
              key={page}
              className={cn(
                'page-item',
                { active: page === currentPage },
              )}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))
        }
        <li
          key="next"
          className={cn(
            'page-item',
            {
              disabled:
              !isNextEnabled,
            },
          )}
        >
          <a
            href="#next"
            className="page-link"
            data-cy="nextLink"
            aria-disabled={
              isNextEnabled
                ? 'false'
                : 'true'
            }
            onClick={() => isNextEnabled && onPageChange('next')}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {
          recentItems.map(item => (
            <li key={item} data-cy="item">{item}</li>
          ))
        }
      </ul>
    </>
  );
};
