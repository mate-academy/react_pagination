import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  lastPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  selectedPage: number;
}

export const Pagination = ({
  lastPage,
  setSelectedPage,
  selectedPage,
}: Props) => {
  const pages = getNumbers(1, lastPage)
    .map(n => `${n}`);

  const handlePrevious = () => (
    selectedPage > 1 && setSelectedPage(selectedPage - 1)
  );

  const handleNext = () => (
    selectedPage < lastPage && setSelectedPage(selectedPage + 1)
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
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                setSelectedPage(!isSelected ? +page : selectedPage);
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
