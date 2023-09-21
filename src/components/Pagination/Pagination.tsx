import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  perPage: number;
}

export const Pagination: React.FC<Props> = ({
  total,
  onPageChange,
  currentPage,
  perPage,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage)
    .map(n => `${n}`);

  const handlePrevious = () => (
    currentPage > 1 && onPageChange(currentPage - 1)
  );

  const handleNext = () => (
    currentPage < lastPage && onPageChange(currentPage + 1)
  );

  return (
    <ul className="pagination">
      <li
        className={cn('page-item',
          currentPage === 1 ? 'disabled' : '')}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={handlePrevious}
        >
          «
        </a>
      </li>
      {pages.map((page) => {
        const isSelected = currentPage === +page;

        return (
          <li
            className={cn('page-item',
              isSelected ? 'active' : '')}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                onPageChange(!isSelected ? +page : currentPage);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item',
          currentPage === lastPage ? 'disabled' : '')}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage ? 'true' : 'false'}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
