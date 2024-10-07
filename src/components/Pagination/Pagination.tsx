import { FC } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = getNumbers(1, Math.ceil(total / perPage));

  const handlePageChange = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;
    const page = element.textContent;

    onPageChange(Number(page));
  };

  const handleArrowPageChange = (direction: 'prev' | 'next') => {
    if (direction === 'next' && currentPage !== amountOfPages.length) {
      onPageChange(currentPage + 1);
    }

    if (direction === 'prev' && currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const isDisabledButton = currentPage === amountOfPages.length;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handleArrowPageChange('prev')}
        >
          «
        </a>
      </li>

      {amountOfPages.map(page => (
        <li
          className={cn('page-item', { active: currentPage === page })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={handlePageChange}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: isDisabledButton,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isDisabledButton}
          onClick={() => handleArrowPageChange('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
