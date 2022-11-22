import React from 'react';

type Props = {
  currentPage: number;
  total: number;
  postPerPage: number;
  onPageChange: any;

};

export const Pagination: React.FC<Props>
= ({
  currentPage, total, postPerPage, setCurrentPage
}) => {
  // const rangeFunctin = (start, end) => {
  //   return [...Array(end).keys()].map(el => el + start);
  // };

  // const pages = rangeFunctin(currentPage, postPerPage);

  return (
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
    </ul>
  )
};
