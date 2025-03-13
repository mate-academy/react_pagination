import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers } from '../../utils';
import React from 'react';

type CallbackPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<CallbackPagination> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const [, setSearchParams] = useSearchParams();
  const handleClick =
    (curPage: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (curPage >= pages[0] && curPage <= pages[pages.length - 1]) {
        setSearchParams({
          page: curPage.toString(),
          perPage: perPage.toString(),
        });
        onPageChange(curPage);
      }
    };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage <= pages[0],
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage <= pages[0] ? 'true' : 'false'}
            onClick={handleClick(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(el => (
          <li
            className={classNames('page-item', { active: currentPage === el })}
            key={el}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={handleClick(el)}
            >
              {el}
            </a>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage >= pages[pages.length - 1],
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage >= pages[pages.length - 1] ? 'true' : 'false'
            }
            onClick={handleClick(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
