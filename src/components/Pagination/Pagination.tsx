import cn from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

type PageClickHandler = (
  e: React.MouseEvent<HTMLAnchorElement>,
  page?: number,
) => void;

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const totalPage = Math.ceil(total / perPage);
  const pages = [];
  const isFirstPage: boolean = currentPage <= 1;
  const isLastPage: boolean = currentPage >= totalPage;

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  function heandlerPage(page: number) {
    if (currentPage !== page) {
      onPageChange(page);
    }
  }

  const handlePrevClick: PageClickHandler = e => {
    e.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick: PageClickHandler = e => {
    e.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick: PageClickHandler = (e, page) => {
    e.preventDefault();
    if (page !== undefined) {
      heandlerPage(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage ? 'true' : 'false'}
          onClick={e => handlePrevClick(e)}
        >
          «
        </a>
      </li>

      {pages.map(peag => (
        <li
          key={peag}
          className={cn('page-item', {
            active: currentPage === peag,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${peag}`}
            onClick={e => handlePageClick(e, peag)}
          >
            {peag}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage ? 'true' : 'false'}
          onClick={e => handleNextClick(e)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
