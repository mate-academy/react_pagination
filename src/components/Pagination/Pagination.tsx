import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: React.SetStateAction<number>) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const handleMoveToPreviousPage = () => {
    if (isFirstPage) {
      return;
    }

    onPageChange((prevState) => prevState - 1);
  };

  const handleMoveToNextPage = () => {
    if (isLastPage) {
      return;
    }

    onPageChange((prevState) => prevState + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item',
          { disabled: isFirstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handleMoveToPreviousPage}
        >
          «
        </a>
      </li>
      {pages.map(number => {
        const isPageSelected = currentPage === number;

        return (
          <li
            key={number}
            className={cn(
              'page-item',
              { active: isPageSelected },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        );
      })}
      <li
        className={cn(
          'page-item',
          { disabled: isLastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleMoveToNextPage}
        >
          »
        </a>
      </li>
    </ul>

  );
};
