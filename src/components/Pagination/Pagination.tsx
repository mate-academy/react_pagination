import { FC } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  visibleItems:string[];
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  nextPage,
  prevPage,
  visibleItems,
  onPageChange,
}) => {
  const pages = getNumbers(1, (total / perPage) + 1);

  const isPrevActive = currentPage === 1;
  const isNextActive = currentPage === pages[pages.length - 1];

  const handlePrevArrowButton = () => {
    if (!isPrevActive) {
      prevPage();
    }
  };

  const handleNextArrowButton = () => {
    if (!isNextActive) {
      nextPage();
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item',
          { disabled: isPrevActive })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            tabIndex={isPrevActive ? -1 : 0}
            aria-disabled={isPrevActive}
            onClick={handlePrevArrowButton}
          >
            «
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={cn('page-item',
              { active: page === currentPage })}
            key={page}
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
        ))}
        <li className={cn('page-item',
          { disabled: isNextActive })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            tabIndex={isNextActive ? -1 : 0}
            aria-disabled={isNextActive}
            onClick={handleNextArrowButton}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}

      </ul>
    </>
  );
};
