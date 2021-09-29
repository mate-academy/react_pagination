import React from 'react';
import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  withInfo: boolean;
};

const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  page = 1,
  onPageChange,
  onPerPageChange,
  withInfo = false,
}) => {
  const pagesArray = [];

  const handleMoveForward = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (page === pagesArray.length) {
      return;
    }

    onPageChange(page + 1);
  };

  const handleMoveBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (page === 1) {
      return;
    }

    onPageChange(page - 1);
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, item: number) => {
    event.preventDefault();
    if (page !== item) {
      onPageChange(item);
    }
  };

  const pages = Math.ceil(total / perPage);

  for (let i = 1; i <= pages; i += 1) {
    pagesArray.push(i);
  }

  return (
    <>
      <label htmlFor="perPageItems">
        Choose items per page:
        <select
          value={perPage}
          name="perPageItems"
          id="perPageItems"
          onChange={event => onPerPageChange(+event.currentTarget.value)}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <nav aria-label="Page navigation example">
        {withInfo
        && (
          <div className="pagination-info">
            {(page - 1) * perPage + 1}
            {' - '}
            {page === pagesArray.length ? total : (page * perPage)}
            {' of '}
            {total}
          </div>
        )}
        <ul className="pagination">
          <li
            className="page-item"
          >
            <a
              className={page === 1 ? 'page-link disabled' : 'page-link'}
              href="https://"
              onClick={handleMoveBack}
            >
              Previous
            </a>
          </li>
          {pagesArray.map(item => (
            <li
              className="page-item"
              key={item}
            >
              <a
                className={page === item ? 'page-link active' : 'page-link'}
                onClick={(event) => handleClick(event, item)}
                href="https://"
              >
                {item}
              </a>
            </li>
          ))}
          <li
            className="page-item"
          >
            <a
              className={page === pagesArray.length ? 'page-link disabled' : 'page-link'}
              href="https://"
              onClick={handleMoveForward}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
