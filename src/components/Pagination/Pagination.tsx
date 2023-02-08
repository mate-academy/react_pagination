import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  paginate: (number: number) => void,
  setCurrentPage: Dispatch<SetStateAction<number>>,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  paginate,
  setCurrentPage,
}) => {
  const amountOfPages = getNumbers(1, Math.ceil(total / perPage));
  const isFirstPage = currentPage === amountOfPages[0];
  const lastPage = amountOfPages[amountOfPages.length - 1];
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
      <li className={classNames(
        'page-item',
        { disabled: isFirstPage },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={handlePrev}
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>
      {amountOfPages.map((pageNumber => (
        <li
          className={classNames(
            'page-item',
            { active: pageNumber === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      )))}

      <li className={classNames(
        'page-item',
        { disabled: isLastPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
