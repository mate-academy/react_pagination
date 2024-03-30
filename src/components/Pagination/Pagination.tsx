import React from 'react';
import cn from 'classnames';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (num: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total.length / perPage);
  const pagesNumbersArr: number[] = [];

  for (let i = 1; i <= pages; i++) {
    pagesNumbersArr.push(i);
  }

  const lastPage = pagesNumbersArr[pagesNumbersArr.length - 1];
  const prepareVisibleItems = (): string[] => {
    const receivedItems = [...total];
    let endIndex = perPage * currentPage;

    if (endIndex > total.length) {
      endIndex = total.length;
    }

    let startIndex = endIndex - perPage;

    if (currentPage === lastPage) {
      startIndex = perPage * currentPage - perPage;
    }

    return receivedItems.slice(startIndex, endIndex);
  };

  const nextPageNumber = () => {
    if (currentPage === lastPage) {
      return currentPage;
    }

    return currentPage + 1;
  };

  const previousPageNumber = () => {
    if (currentPage === 1) {
      return currentPage;
    }

    return currentPage - 1;
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => onPageChange(previousPageNumber())}
          >
            «
          </a>
        </li>

        {pagesNumbersArr.map(number => {
          return (
            <li
              className={cn('page-item', {
                // eslint-disable-next-line prettier/prettier
                'active': number === currentPage,
              })}
              key={number}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </a>
            </li>
          );
        })}

        <li className={cn('page-item', { disabled: currentPage === lastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={currentPage === lastPage ? 'true' : 'false'}
            onClick={() => onPageChange(nextPageNumber())}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {prepareVisibleItems().map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};
