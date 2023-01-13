import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (number:number) => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const Pagination:React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  setCurrentPage,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, numberOfPages);

  const isFirstPage = currentPage === pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];
  const isLastPage = currentPage === lastPage;

  const handlePrev = () => {
    setCurrentPage(current => {
      return current !== 1
        ? current - 1
        : current;
    });
  };

  const handleNext = () => {
    setCurrentPage(current => {
      return current !== lastPage
        ? current + 1
        : current;
    });
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: isFirstPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          onClick={handlePrev}
          href="#prev"
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>

      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={cn(
            'page-item',
            { active: pageNumber === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(pageNumber)}
            href={`#${pageNumber}`}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item',
        { disabled: isLastPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          onClick={handleNext}
          href="#next"
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
