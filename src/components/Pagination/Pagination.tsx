import cn from 'classnames';
import React from 'react';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberPag = Math.ceil(total / perPage);

  function countPagination() {
    const countArr: number[] = [];

    for (let i = 1; i <= numberPag; i += 1) {
      countArr.push(i);
    }

    return countArr;
  }

  const count = countPagination();

  function changeCheck(numPage: number) {
    if (numPage > 0 && numPage <= numberPag && numPage !== currentPage) {
      onPageChange(numPage);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            changeCheck(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {count.map(item => (
        <li
          className={cn('page-item', { active: currentPage === item })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => {
              onPageChange(item);
            }}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === numberPag })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberPag}
          onClick={() => {
            changeCheck(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
