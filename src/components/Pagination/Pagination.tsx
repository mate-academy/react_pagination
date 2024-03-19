import React from 'react';
import cn from 'classnames';

type Props = {
  visibleItems: string[];
  currentPage: number;
  amountPages: number[];
  setCurrentPage: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  visibleItems,
  currentPage,
  amountPages,
  setCurrentPage,
}: Props) => {
  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === amountPages[0],
          })}
          onClick={() =>
            currentPage > amountPages[0] && setCurrentPage(currentPage - 1)
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === amountPages[0]}
          >
            «
          </a>
        </li>

        {amountPages.map(page => (
          <li
            key={page}
            className={`page-item ${cn({ active: currentPage === page })}`}
            onClick={() => setCurrentPage(page)}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${currentPage}`}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === amountPages[amountPages.length - 1],
          })}
          onClick={() =>
            currentPage < amountPages[amountPages.length - 1] &&
            setCurrentPage(currentPage + 1)
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === amountPages[amountPages.length - 1]}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map((item: string) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
