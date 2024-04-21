import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Item = string;

type Props = {
  total: Item[];
  perPage: number;
  currentPage: number;
  onPageChange: (pageNum: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const filteredItems = total.filter(
    (_, index) =>
      index + 1 > perPage * (currentPage - 1) && index < perPage * currentPage,
  );

  const pageLinkQty = getNumbers(1, Math.ceil(total.length / perPage));
  const handleNextPage = () => {
    if (currentPage !== pageLinkQty.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={`${currentPage === 1 ? 'true' : 'false'}`}
            onClick={handePrevPage}
          >
            «
          </a>
        </li>
        {pageLinkQty.map(page => (
          <li
            className={cn('page-item', {
              active: page === currentPage,
            })}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a href={`#${page}`} className="page-link" data-cy="pageLink">
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === pageLinkQty.length && 'disabled'}`}
        >
          <a
            data-cy="nextLink"
            href="#next"
            className="page-link"
            aria-disabled={`${currentPage === pageLinkQty.length ? 'true' : 'false'}`}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>
      {filteredItems.map(item => (
        <li data-cy="item" key={item}>
          {item}
        </li>
      ))}
    </>
  );
};
