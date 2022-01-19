import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  activePage: number;
  onPageChange: (page: number) => void;
  toNextPage: () => void;
  toPrevPage: () => void;
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
  const startItemsRange = perPage * (activePage - 1) + 1;
  const endItemsRange = pageQuantity === activePage ? total : activePage * perPage;
  const pagesArr = Array.from(Array(pageQuantity).keys()).map(num => num + 1);

  return (
    <nav>
      <h3>{`${startItemsRange} - ${endItemsRange} of ${total}`}</h3>

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

        {pagesArr.map(page => (
          <>
            {(page === activePage - 2 || page === activePage + 2) && (
              <li className="pagination__page">
                <button
                  type="button"
                  className="
                    pagination__page-button
                    pagination__page-button--spread
                  "
                  hidden={page === activePage - 2
                    ? activePage < 4
                    : activePage >= pageQuantity - 2}
                >
                  ...
                </button>
              </li>
            )}

            <li className="pagination__page">
              <button
                type="button"
                key={page}
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
            disabled={activePage === pageQuantity}
            onClick={toNextPage}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};
