import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  selectedPage: number;
  perPage: number;
}

export const Pagination: React.FC<Props> = ({
  total,
  onPageChange,
  selectedPage,
  perPage,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage)
    .map(n => `${n}`);

  const handlePrevious = () => (
    selectedPage > 1 && onPageChange(selectedPage - 1)
  );

  const handleNext = () => (
    selectedPage < lastPage && onPageChange(selectedPage + 1)
  );

  return (
    <ul className="pagination">
      <li
        className={cn('page-item',
          selectedPage === 1 ? 'disabled' : '')}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={selectedPage === 1 ? 'true' : 'false'}
          onClick={handlePrevious}
        >
          «
        </a>
      </li>
      {pages.map((page) => {
        const isSelected = selectedPage === +page;

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
                onPageChange(!isSelected ? +page : selectedPage);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item',
          selectedPage === lastPage ? 'disabled' : '')}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={selectedPage === lastPage ? 'true' : 'false'}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
