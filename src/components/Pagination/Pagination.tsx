import { FC } from 'react';
import cn from 'classnames';
import './Pagination.scss';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number | string) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const firstItem = (currentPage - 1) * perPage + 1;

  const lastItem = firstItem + perPage > total
    ? total
    : firstItem + perPage - 1;
  const recentItems = getNumbers(firstItem, lastItem).map((n: number) => `Item ${n}`);

  const paginationNumber = Math.ceil(total / perPage);

  const pageList = getNumbers(1, paginationNumber);

  return (
    <>
      <ul className="Pagination">
        <li
          key="prev"
          className={cn(
            'page-item',
            {
              disabled:
              currentPage
              === 1,
            },
          )}
        >
          <a
            href="#prev"
            className="page-link"
            data-cy="prevLink"
            aria-disabled={
              currentPage > 1
                ? 'false'
                : 'true'
            }
            onClick={() => currentPage > 1 && onPageChange('prev')}
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
              currentPage
              === paginationNumber,
            },
          )}
        >
          <a
            href="#next"
            className="page-link"
            data-cy="nextLink"
            aria-disabled={
              currentPage < paginationNumber
                ? 'false'
                : 'true'
            }
            onClick={() => (
              currentPage < paginationNumber && onPageChange('next')
            )}
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

/*
  <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>
        <li className="page-item active">
          <a data-cy="pageLink" className="page-link" href="#1">1</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#2">2</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#3">3</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#4">4</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#5">5</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#6">6</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#7">7</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#8">8</a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#9">9</a>
        </li>
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        <li data-cy="item">Item 1</li>
        <li data-cy="item">Item 2</li>
        <li data-cy="item">Item 3</li>
        <li data-cy="item">Item 4</li>
        <li data-cy="item">Item 5</li>
      </ul> */
