import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  let pageCount = 0;
  const pages: number[] = [];
  const itemsArr: number[] = [];

  const handleChangeClick = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  for (let i = 1; i <= perPage; i += 1) {
    const resultItem = i + perPage * (currentPage - 1);

    itemsArr.push(resultItem);
  }

  for (let i = total; i > 0; i -= perPage) {
    pageCount += 1;
    pages.push(pageCount);
  }

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        >
          {currentPage === 1 ? (
            <a
              data-cy="prevLink"
              className="page-link"
              href="#prev"
              aria-disabled="true"
            >
              «
            </a>
          ) : (
            <a
              data-cy="prevLink"
              className="page-link"
              href="#prev"
              aria-disabled="false"
              onClick={() => {
                onPageChange(currentPage - 1);
              }}
            >
              «
            </a>
          )}
        </li>
        {pages.map(page => (
          <li
            className={cn('page-item', {
              active: currentPage === page,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handleChangeClick(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === pages[pages.length - 1],
          })}
        >
          {currentPage !== pages[pages.length - 1] ? (
            <a
              data-cy="nextLink"
              className="page-link"
              href="#next"
              aria-disabled="false"
              onClick={() => {
                onPageChange(currentPage + 1);
              }}
            >
              »
            </a>
          ) : (
            <a
              data-cy="nextLink"
              className="page-link"
              href="#next"
              aria-disabled="true"
            >
              »
            </a>
          )}
        </li>
      </ul>
      <ul>
        {itemsArr.map(item => (
          item <= total && (
            <li data-cy="item" key={item}>
              {`Item ${item}`}
            </li>
          )
        ))}
      </ul>
    </>
  );
};
