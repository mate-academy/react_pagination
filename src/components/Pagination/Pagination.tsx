import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  pagesCount: number
  onSelectedPage: (page: number) => void
  selectedPage: number
  firstItem: number
  lastItem: number
};

export const Pagination: React.FC<Props> = ({
  pagesCount,
  onSelectedPage,
  selectedPage,
  firstItem,
  lastItem,
}) => {
  const totalPages = [];
  const itemsOnPage = getNumbers(firstItem, lastItem);
  const nextIsDisabled = selectedPage === pagesCount;
  const prevIsDisabled = selectedPage === 1;

  for (let i = 1; i <= pagesCount; i += 1) {
    totalPages.push(i);
  }

  const previosPage = () => {
    if (selectedPage !== 1) {
      onSelectedPage(selectedPage - 1);
    }
  };

  const nextPage = () => {
    if (selectedPage !== pagesCount) {
      onSelectedPage(selectedPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: prevIsDisabled })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevIsDisabled}
            onClick={previosPage}
          >
            «
          </a>
        </li>
        {totalPages.map(page => (
          <li
            className={cn({ 'page-item active': page === selectedPage })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onSelectedPage(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', { disabled: nextIsDisabled })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextIsDisabled}
            onClick={nextPage}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map(item => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}
      </ul>
    </>
  );
};
