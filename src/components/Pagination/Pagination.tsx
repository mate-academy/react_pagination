import React from 'react';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
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
        <a data-cy="pageLink" className="page-link" href="#1">1</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#2">2</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#3">3</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#4">4</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#5">5</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#6">6</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#7">7</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#8">8</a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#9">9</a>
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
  );
};
