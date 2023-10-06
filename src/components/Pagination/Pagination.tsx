import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  pagesCount: number
  selectedPage: number
  selectPage: (pageNumber: number) => void
}

export const Pagination: React.FC<Props> = ({
  pagesCount,
  selectedPage,
  selectPage,
}) => {
  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: selectedPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={selectedPage === 1}
          onClick={() => {
            if (selectedPage !== 1) {
              selectPage(selectedPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {
        getNumbers(1, pagesCount)
          .map(item => (
            <li
              key={item}
              className={classNames('page-item', {
                active: item === selectedPage,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${item}`}
                onClick={() => {
                  selectPage(item);
                }}
              >
                {item}
              </a>
            </li>
          ))
      }

      <li className={classNames('page-item', {
        disabled: selectedPage === pagesCount,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={selectedPage === pagesCount}
          onClick={() => {
            if (selectedPage !== pagesCount) {
              selectPage(selectedPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
