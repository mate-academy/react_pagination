import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  itemsOnPage: string[] | number[],
  onPageChange: (event:React.MouseEvent<HTMLAnchorElement>) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  itemsOnPage,
  onPageChange,
}) => {
  const totalPagesNum: number = Math.ceil(total / perPage);
  const pagesCount: number[] = getNumbers(1, totalPagesNum);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={onPageChange}
          >
            «
          </a>
        </li>

        {pagesCount.map((page) => (
          <li
            key={page}
            className={classNames('page-item', {
              active: currentPage === page,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={onPageChange}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames('page-item', {
            disabled: currentPage === totalPagesNum,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPagesNum}
            onClick={onPageChange}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map((item) => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
