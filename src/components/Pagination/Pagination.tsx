import React from 'react';
import cn from 'classnames';

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
  const countButtons = Math.ceil(total / perPage);
  const buttons: number[] = Array.from(
    { length: countButtons },
    (_, i) => i + 1,
  );
  const isActive = (pageNumber: number): boolean => {
    return pageNumber === currentPage;
  };

  const disableNext = currentPage === 1;
  const disablePrev = currentPage === buttons.length;

  const returnPage = () => {
    if (disableNext) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    if (disablePrev) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: disableNext })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disableNext}
          onClick={returnPage}
        >
          «
        </a>
      </li>
      {buttons.map(button => (
        <li
          className={cn('page-item', { active: isActive(button) })}
          key={button}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${button}`}
            onClick={() => onPageChange(button)}
          >
            {button}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: disablePrev,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={nextPage}
          aria-disabled={disablePrev}
        >
          »
        </a>
      </li>
    </ul>
  );
};
