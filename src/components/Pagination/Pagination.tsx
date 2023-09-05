import React, { useMemo } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const itemsNumbers: number[] = getNumbers(1, total);
  const pages: number[] = getNumbers(1, Math.ceil(total / perPage));

  const firstPageIndex = (currentPage - 1) * perPage;
  const lastPageIndex = firstPageIndex + perPage < itemsNumbers.length
    ? firstPageIndex + perPage
    : itemsNumbers.length;
  const currentTableData = useMemo(() => {
    return itemsNumbers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, perPage]);

  const firstPageIsActive = currentPage === 1;
  const lastPageIsActive = currentPage === pages.length;

  const previousPageHandler = () => {
    if (!firstPageIsActive) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (!lastPageIsActive) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: firstPageIsActive })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={firstPageIsActive}
            onClick={previousPageHandler}
          >
            «
          </a>
        </li>
        {getNumbers(1, Math.ceil(total / perPage)).map((pageNumber: number) => (
          <li
            className={cn('page-item',
              { active: currentPage === pageNumber })}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => {
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li className={cn('page-item',
          { disabled: lastPageIsActive })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={lastPageIsActive}
            onClick={nextPageHandler}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentTableData.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
