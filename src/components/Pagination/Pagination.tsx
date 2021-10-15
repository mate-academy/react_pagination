import React from 'react';
import './Pagination.scss';
import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (page: number) => void,
  options: number[],
  onPerPageChange: (perPage: number) => void,
  withInfo: boolean,
};

const Pagination: React.FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  options,
  onPerPageChange,
  withInfo = false,
}) => {
  const pages = [];
  const availablePages = Math.ceil(total / perPage);

  for (let i = 1; i <= availablePages; i += 1) {
    pages.push(i);
  }

  const handleClick = (item: number) => {
    if (page !== item) {
      onPageChange(item);
    }
  };

  const handlePreviousClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (page === 1) {
      return;
    }

    onPageChange(page - 1);
  };

  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (page === availablePages) {
      return;
    }

    onPageChange(page + 1);
  };

  const handleSelectChange = (value: string) => {
    if (perPage === +value) {
      return;
    }

    onPerPageChange(+value);
  };

  return (
    <div className="container">
      <label htmlFor="page">
        Choose items per page:
        {' '}
        <select
          name=""
          id="page"
          value={perPage}
          onChange={(event) => {
            handleSelectChange(event.target.value);
          }}
        >
          {options.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </label>
      <nav className="page-navigation">
        {withInfo && (
          <div className="pagination-info">
            {(page - 1) * perPage + 1}
            {' '}
            -
            {' '}
            {page === pages.length ? total : (page * perPage)}
            {' '}
            of
            {' '}
            {total}
          </div>
        )}
        <ul className="pagination">
          <li className="page-item">
            <a
              href="https://"
              className={classNames('page-link', { 'page-link--disabled': page === 1 })}
              onClick={handlePreviousClick}
            >
              Previous
            </a>
          </li>
          {pages.map(item => (
            <li
              key={item}
              className="page-item"
            >
              <a
                href="https://"
                className={classNames('page-link', { 'page-link--active': item === page })}
                onClick={(event) => {
                  event.preventDefault();
                  handleClick(item);
                }}
              >
                {item}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className={classNames('page-link', { 'page-link--disabled': page === availablePages })}
              href="https://"
              onClick={handleNextClick}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
