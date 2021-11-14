import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage?: number;
  page?: number;
  withInfo?: boolean;
  onPageChange: (pageNum: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  page = 1,
  withInfo = false,
  onPageChange,
}) => {
  const amountPage = Math.ceil(total / perPage);
  const perPageStart = perPage * (page - 1) + 1;
  const perPageEnd = page === amountPage ? total : (page - 1) * perPage + perPage;
  const arrPages = Array.from(Array(amountPage).keys());

  return (
    <nav aria-label="Page navigation example">
      {withInfo && (
        <div className="pagination-info">
          {perPageStart}
          {' - '}
          {perPageEnd}
          {' of '}
          {total}
        </div>
      )}
      <ul className="pagination">
        <li className="page-item">
          <button
            type="button"
            className="page-link"
            aria-label="Previous"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {arrPages.map(el => {
          const currPage = el + 1;

          if (page === currPage
            || page === el
            || page === currPage + 1
            || page === currPage + 2
            || page === currPage - 2
          ) {
            return (
              <li
                className={classNames('page-item', { active: currPage === page })}
                key={el}
              >
                {
                  page === currPage + 2 || page === currPage - 2
                    ? (
                      <div className="page-link">
                        ...
                      </div>
                    )
                    : (
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => onPageChange(currPage)}
                        disabled={page === currPage + 2 || page === currPage - 2}
                      >
                        {page === currPage + 2 || page === currPage - 2 ? '...' : currPage}
                      </button>
                    )
                }
              </li>
            );
          }

          return null;
        })}

        <li className="page-item">
          <button
            type="button"
            className="page-link"
            aria-label="Next"
            disabled={page === amountPage}
            onClick={() => onPageChange(page + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
  withInfo: false,
};
