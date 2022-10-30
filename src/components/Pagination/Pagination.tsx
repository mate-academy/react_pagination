import { FC } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage = 1,
}) => {
  const paginationLength = Math.ceil(total / perPage);
  const paginationItems = getNumbers(1, paginationLength);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === paginationLength;

  const changePageToPrev = () => {
    if (!isPrevDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const changePageToNext = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isPrevDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={changePageToPrev}
        >
          «
        </a>
      </li>

      {paginationItems.map(item => (
        <li
          className={cn('page-item', {
            active: item === currentPage,
          })}
          key={uuidv4()}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: isNextDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={changePageToNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
};
