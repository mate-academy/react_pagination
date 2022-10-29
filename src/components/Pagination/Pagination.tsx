import { FC } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

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
  const paginationItems = Array(paginationLength).fill(0).map((_, i) => i + 1);
  const prevIsDisabled = currentPage === 1;
  const nextIsDisabled = currentPage === paginationLength;

  const changePageToPrev = () => {
    if (!prevIsDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const changePageToNext = () => {
    if (!nextIsDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: prevIsDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevIsDisabled}
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
          disabled: nextIsDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextIsDisabled}
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
