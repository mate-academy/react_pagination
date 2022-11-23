// import classNames from 'classnames';
import React from 'react';

type Props = {
  currentPage: number;
  total: number;
  postPerPage: number;
  // onPageChange: any;
  onPageChange:any;
  setCurrentPage: any;
  // classActive: boolean;

};

export const Pagination: React.FC<Props>
= ({
  currentPage, total, postPerPage, onPageChange, setCurrentPage,
}) => {
  // const rangeFunctin = (start, end) => {
  //   return [...Array(end).keys()].map(el => el + start);
  // };

  // const pages = rangeFunctin(currentPage, postPerPage);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / postPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((current: number) => current - 1);
    }
  };

  const nextPage = () => {
    // setCurrentPage((current: number) => current + 1);
    if (currentPage !== 9) {
      setCurrentPage((current: number) => current + 1);

      // aria-disabled="true";
    }

    // if (currentPage === 9) {
    //   break;
    // }

    // do {
    //   setCurrentPage((current: number) => current + 1);
    // } while (currentPage < 9);
  };

  return (
    <ul className="pagination">
      <li className="page-item">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={previousPage}
          // aria-disabled="true"
        >
          «
        </a>
      </li>
      {pageNumbers.map(number => (
        // <li className={classNames('page-item', { 'active': classActive })}>
        <li className="page-item">
          <a
            key={number}
            data-cy="pageLink"
            // className={classNames('page-link', { 'active': classActive })}
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => onPageChange(number)}
            // className="active"
          >
            {number}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};

/*
<ul className="pagination">
      <li className="page-item disabled">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>
      <li className="page-item active">
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${currentPage}`}
        >
          1
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>2</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>3</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>4</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>5</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>6</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>7</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>8</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href={`#${currentPage}`}>9</a>
      </li>
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul> */
