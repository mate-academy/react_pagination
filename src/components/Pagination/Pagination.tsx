import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value:number) => void;
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage = 1, onPageChange,
}) => {
  const qtyOfPages = Math.ceil(total / perPage);

  const allPages = getNumbers(1, qtyOfPages);

  const moveBack = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const moveForward = () => {
    if (currentPage === qtyOfPages) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage - 1}`}
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={moveBack}
        >
          «
        </a>
      </li>

      {allPages.map(page => (
        <li
          className={cn('page-item', { active: currentPage === page })}
          key={page}
        >
          <a
            onClick={() => onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item', { disabled: currentPage === qtyOfPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage + 1}`}
          aria-disabled={currentPage === qtyOfPages ? 'true' : 'false'}
          onClick={moveForward}
        >
          »
        </a>
      </li>
    </ul>
  );
};
