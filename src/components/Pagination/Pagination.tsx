import React from "react";
import classNames from "classnames";

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const pages: number[][] = [];
  const pagesNumber = Math.ceil(total / perPage);

  for (let i = 1; i <= pagesNumber; i += 1) {
    pages.push([]);
    for (let j: number = i * perPage - perPage; j < i * perPage && j < total; j += 1) {
      pages[i - 1].push(j + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={
        classNames('page-item', {
          "disabled": currentPage <= 1,
        })
      }>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage > 1 ? 'false' : 'true'}
          onClick={
            () => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }
          }
        >
          «
        </a>
      </li>
      {pages.map((_, index) => {
        return (
          <li
            key={index}
            className={
              classNames('page-item', {
                'active': index + 1 === currentPage,
              })
            }>
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={
                () => {
                  onPageChange(index + 1);
                }
              }
            >
              {index + 1}
            </a>
          </li>
        )
      })}
      <li className={
        classNames('page-item', {
          "disabled": currentPage === pagesNumber,
        })
      }>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage < pagesNumber ? 'false' : 'true'}
          onClick={
            () => {
              if (currentPage < pagesNumber) {
                onPageChange(currentPage + 1);
              }
            }
          }
        >
          »
        </a>
      </li>
    </ul>
  )
};
