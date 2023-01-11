import { FC } from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void
}

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const idForNumbers = new Array(numberOfPages)
    .fill(null)
    .map(() => getRandomDigits());

  const handlePageChange = (page: number) => {
    if (currentPage !== page && page >= 1 && page <= numberOfPages) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 && 'true'}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {idForNumbers.map((el, index) => {
        const number = index + 1;

        return (
          <li
            key={el}
            className={cn('page-item',
              { active: number === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </a>
          </li>
        );
      })}

      <li className={cn('page-item',
        { disabled: currentPage === numberOfPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages && 'true'}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
