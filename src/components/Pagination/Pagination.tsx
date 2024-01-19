import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const count = Math.ceil(total / perPage);
  const countPages: number[] = [];

  for (let i = 1; i <= count; i += 1) {
    countPages.push(i);
  }

  const hendelPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const hendelNextPage = () => {
    if (currentPage < countPages.length) {
      onPageChange(currentPage + 1);
    }
  };

  const hendelNewPage = (num: number) => {
    onPageChange(num);
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={hendelPrevPage}
        >
          «
        </a>
      </li>

      {countPages.map(num => (
        <li
          className={cn('page-item', {
            active: currentPage === num,
          })}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => hendelNewPage(num)}
          >
            {num}
          </a>
        </li>
      ))}

      <li className={cn('page-item', {
        disabled: currentPage === countPages.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPages.length ? 'true' : 'false'}
          onClick={hendelNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
