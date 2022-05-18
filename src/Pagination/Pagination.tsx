import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  toNextPage: () => void;
  toPrevPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  toNextPage,
  toPrevPage,
}) => {
  const pageBlocks = Math.ceil(total / perPage);
  const startPage = perPage * (currentPage - 1) + 1;
  const endPage = pageBlocks === currentPage ? total : currentPage * perPage;
  const arrayPages = Array.from(Array(pageBlocks).keys()).map(num => num + 1);

  return (
    <div className="pagination">
      <h1 className="pagination_title">
        {`${startPage} - ${endPage} of ${total}`}
      </h1>
      <ul className="pagination_list">
        <li>
          <button
            type="button"
            className="pagination_button"
            disabled={currentPage === 1}
            onClick={toPrevPage}
          >
            Previous
          </button>
        </li>

        {arrayPages.map(el => (
          <>
            {(el === currentPage - 2 || el === currentPage + 2) && (
              <li key={el}>
                <button
                  type="button"
                  className="pagination_item"
                  hidden={el === currentPage - 2
                    ? currentPage < 4
                    : currentPage >= pageBlocks - 2}
                >
                  ...
                </button>
              </li>
            )}

            <li>
              <button
                type="button"
                key={el}
                className={classNames(
                  'pagination_item',
                  { 'pagination_item--active': currentPage === el },
                )}
                hidden={
                  el !== 1
                  && el !== currentPage
                  && el !== currentPage + 1
                  && el !== currentPage - 1
                  && el < pageBlocks
                }
                onClick={() => onPageChange(el)}
              >
                {el}
              </button>
            </li>
          </>
        ))}

        <li>
          <button
            type="button"
            className="pagination_button"
            disabled={currentPage >= pageBlocks}
            onClick={toNextPage}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};
