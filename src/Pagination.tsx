import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  page: number;
  withInfo?: boolean;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  page = 1,
  withInfo,
  onPageChange,
  onPerPageChange,
}) => {
  const pageAmount = Math.ceil(total / perPage);

  const isFirstPage = page === 1;
  const isLastPage = page === pageAmount;

  const pageInfoIntervalMin = perPage * (page - 1) + 1;
  const pageInfoIntervalMax = Math.min(total, perPage * page);

  return (
    <nav>
      {withInfo && (
        <h1 className="text-center">
          {`${pageInfoIntervalMin} - ${pageInfoIntervalMax} of ${total}`}
        </h1>
      )}

      <ul className="pagination pagination-lg">
        <li
          className={classNames({
            'page-item': true,
            disabled: isFirstPage,
          })}
        >
          <button
            type="button"
            className="page-link"
            value={page - 1}
            onClick={onPageChange}
          >
            <span>&laquo;</span>
          </button>
        </li>

        {Array.from({ length: pageAmount }, (_, index) => (
          <li
            key={index}
            className={classNames({
              'page-item': true,
              active: index + 1 === page,
            })}
          >
            <button
              type="button"
              className="page-link"
              value={index + 1}
              onClick={onPageChange}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li
          className={classNames({
            'page-item': true,
            disabled: isLastPage,
          })}
        >
          <button
            type="button"
            className="page-link"
            value={page + 1}
            onClick={onPageChange}
          >
            <span>&raquo;</span>
          </button>
        </li>
      </ul>

      <div className="d-flex p-3 border rounded-3">
        <span className="fs-4 text-nowrap">Per page</span>
        <select
          className="form-select"
          defaultValue={5}
          onChange={onPerPageChange}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </nav>
  );
};

Pagination.defaultProps = {
  withInfo: false,
};

export default Pagination;
