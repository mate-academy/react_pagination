import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number,
  perPage: number,
  activePage: number,
  onPageChange: (page: number) => void,
  toNextPage: () => void,
  toPrevPage: () => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  activePage,
  onPageChange,
  toNextPage,
  toPrevPage,
}) => {
  const pageQuantity = Math.ceil(total / perPage);
  const startInfoItem = perPage * (activePage - 1) + 1;
  const endInfoItem = pageQuantity === activePage
    ? total
    : activePage * perPage;
  const pageArr = Array.from({ length: pageQuantity }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example">
      <h3>{`${startInfoItem} - ${endInfoItem} of ${total}`}</h3>

      <ul className="pagination">
        <li className="pagination__page">
          <button
            type="button"
            className="pagination__page-button"
            disabled={activePage === 1}
            onClick={toPrevPage}
          >
            &laquo;
          </button>
        </li>

        {pageArr.map(page => (
          <>
            {(page === activePage + 2 || page === activePage - 2) && (
              <li
                key={`dots-${page}`}
                className="pagination__page"
              >
                <button
                  type="button"
                  className={classNames(
                    'pagination__page-button',
                    'pagination__page-button--dots',
                  )}
                  hidden={
                    page === activePage - 2
                      ? activePage < 4
                      : activePage >= pageQuantity - 2
                  }
                >
                  ...
                </button>
              </li>
            )}

            <li
              key={page}
              className="pagination__page"
            >
              <button
                type="button"
                className={classNames(
                  'pagination__page-button',
                  { 'pagination__page-button--active': page === activePage },
                )}
                hidden={
                  page !== 1
                  && page !== activePage
                  && page !== activePage + 1
                  && page !== activePage - 1
                  && page < pageQuantity
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          </>
        ))}

        <li className="pagination__page">
          <button
            type="button"
            className="pagination__page-button"
            disabled={activePage === pageArr.length}
            onClick={toNextPage}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};
