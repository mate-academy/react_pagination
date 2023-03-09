import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { splitPages } from '../../utils';

type Props = {
  items: string[],
  perPage: number,
  currentPage: number,
  onPageChange: Dispatch<SetStateAction<number>>,
};

export const Pagination: React.FC<Props> = ({
  items,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const book = splitPages(items, perPage);
  const numOfPages = Object.keys(book);
  const numLastPage = numOfPages.length;

  const getNextPage = () => {
    if (currentPage === items.length - 1) {
      return;
    }

    onPageChange(prevPage => prevPage + 1);
  };

  const getPrevPage = () => {
    if (currentPage === 0) {
      return;
    }

    onPageChange(prevPage => prevPage - 1);
  };

  return (
    <>
      <ul className="pagination">
        <li
          key="prev"
          className={classNames(
            'page-item',
            {
              disabled: currentPage === 1,
            },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            onClick={getPrevPage}
            href="#prev"
            aria-disabled="false"
          >
            «
          </a>
        </li>

        {numOfPages.map((num) => (
          <li
            key={num}
            className={classNames(
              'page-item',
              {
                active: +num === currentPage,
              },
            )}
          >
            <a
              data-cy="pageLink"
              onClick={() => {
                onPageChange(+num);
              }}
              className="page-link"
              href={`#${num}`}
            >
              {num}
            </a>
          </li>
        ))}

        <li
          key="next"
          className={classNames(
            'page-item',
            {
              disabled: currentPage === numLastPage,
            },
          )}
        >
          <a
            data-cy="nextLink"
            onClick={getNextPage}
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul className="page">
        {book[currentPage].map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
