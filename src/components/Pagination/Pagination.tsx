import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNums: number[] = [];
  const pagesCounter = Math.ceil(total / perPage);

  for (let i = 1; i <= pagesCounter; i += 1) {
    pageNums.push(i);
  }

  const handlePageNumClick = (num: number) => {
    if (num !== currentPage && num > 0 && num <= pageNums.length) {
      onPageChange(num);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageNumClick(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pageNums.map(num => (
        <li
          key={num}
          className={classNames(
            'page-item',
            { active: num === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => handlePageNumClick(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        { disabled: currentPage === pageNums.length },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNums.length}
          onClick={() => handlePageNumClick(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
