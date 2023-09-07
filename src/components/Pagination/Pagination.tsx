import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage:number;
  currentPage:number;
  onPageChange:(number: number) => void

};
export const Pagination : React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  function pagecount(allitem:number, pagesinList:number):number[] {
    const pages:number = (allitem - (allitem % pagesinList)) / pagesinList;
    const allPages = (allitem % pagesinList) ? pages + 1 : pages;

    const arrpages = [];

    for (let i = 1; i <= allPages; i += 1) {
      arrpages.push(i);
    }

    return arrpages;
  }

  const numberPage = pagecount(total, perPage);

  return (
    <ul
      className="pagination"
    >
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {numberPage.map(page => {
        return (
          <li className={cn('page-item', 'is-info',
            { active: currentPage === page })}
          >
            <a
              key={page}
              data-cy="pageLink"
              className="page-link"
              onClick={() => {
                onPageChange(page);
              }}
              href="#1"
            >
              {page}

            </a>
          </li>
        );
      })}
      <li className={cn('page-item',
        { disabled: currentPage === numberPage.length })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => {
            if (perPage * currentPage < total) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
