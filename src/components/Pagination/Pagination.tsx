import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { splitPages } from '../../utils';

type Props = {
  total: string[],
  perPage: number,
  currentPage: number,
  onPageChange: Dispatch<SetStateAction<number>>,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const book = splitPages(total, perPage);

  const getNextPage = () => {
    if (currentPage === total.length - 1) {
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
              disabled: currentPage === 0,
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

        {book.map((page, index) => (
          <li
            key={String(page)}
            className={classNames(
              'page-item',
              {
                active: index === currentPage,
              },
            )}
          >
            <a
              data-cy="pageLink"
              onClick={() => {
                onPageChange(index);
              }}
              className="page-link"
              href={`#${index}`}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li
          key="next"
          className={classNames(
            'page-item',
            {
              disabled: currentPage === book.length - 1,
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
