import { FC } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../helpers';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void

}

export const Pagination: FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  const handleNext = () => {
    if (isLastPage) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (isFirstPage) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlePrev}
        >
          «
        </a>
      </li>

      {pages.map((page => (
        <li className={cn('page-item', {
          active: page === currentPage,
        })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      )))}

      <li className={cn(
        'page-item',
        { disabled: isLastPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
