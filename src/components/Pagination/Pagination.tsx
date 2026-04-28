import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageLinkTotal = getNumbers(1, Math.ceil(total / perPage));
  const maxPage = pageLinkTotal[pageLinkTotal.length - 1];

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();
            if (currentPage === 1) {
              return;
            }

            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pageLinkTotal.map(pageLink => (
        <li
          className={
            currentPage === pageLink ? 'page-item active' : 'page-item'
          }
          key={pageLink}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageLink}`}
            onClick={event => {
              event.preventDefault();
              onPageChange(pageLink);
            }}
          >
            {pageLink}
          </a>
        </li>
      ))}
      {/* <li className="page-item active">
        <a data-cy="pageLink" className="page-link" href="#1">
          1
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#2">
          2
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#3">
          3
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#4">
          4
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#5">
          5
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#6">
          6
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#7">
          7
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#8">
          8
        </a>
      </li>
      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#9">
          9
        </a>
      </li> */}
      <li
        className={currentPage === maxPage ? 'page-item disabled' : 'page-item'}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPage ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();
            if (currentPage === maxPage) {
              return;
            }

            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
