import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  setCurrentPage: (num: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, pageCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  const changeToPrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeToNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => changeToPrevPage()}
        >
          «
        </a>
      </li>
      {pageNumbers.map(num => (
        <li
          className={classNames('page-item', {
            active: currentPage === num,
          })}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => changeToNextPage()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
