import classNames from 'classnames';
import React from 'react';

interface Pages {
  possiblePages: number[],
  setCurrentPage(page: number): void,
  rangeOfItems: number[],
  currentPage: number,
  maxItem: number,
}

export const Pagination: React.FC<Pages> = ({
  possiblePages,
  setCurrentPage,
  rangeOfItems,
  currentPage,
  maxItem,
}) => {
  const disablePrev = rangeOfItems[0] === 1;
  const disableNext = rangeOfItems[rangeOfItems.length - 1] >= maxItem;

  return (
    <div>
      <div className="content">
        <ul>
          {rangeOfItems.map(item => (
            <li
              data-cy="item"
              key={item}
            >
              {`Item ${item}`}
            </li>
          ))}
        </ul>
      </div>
      <ul className="pagination">
        <li className={classNames(
          'page-item',
          { disabled: disablePrev },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={disablePrev}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </a>
        </li>

        {possiblePages.map(pageNumber => {
          const active = classNames({
            active: pageNumber === currentPage,
          });

          return (
            <li className="page-item" key={pageNumber}>
              <a
                data-cy="pageLink"
                className={`page-link ${active}`}
                href={`#${pageNumber}`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}

        <li className={classNames(
          'page-item',
          { disabled: disableNext },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={disableNext}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
