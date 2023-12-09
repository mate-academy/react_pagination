import classNames from 'classnames';
import { useMemo } from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (pageNum: number | ((prevPage: number) => number)) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [total, perPage]);

  const pages = getNumbers(1, pageCount);

  const handleBackwardButton = () => {
    if (currentPage !== 1) {
      onPageChange(prevPage => prevPage - 1);
    }
  };

  const handleForwardButton = () => {
    if (currentPage !== pageCount) {
      onPageChange(prevPage => prevPage + 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleBackwardButton}
        >
          «
        </a>
      </li>

      {pages.map(pageNumber => (
        <li
          className={classNames(
            'page-item',
            { active: pageNumber === currentPage },
          )}
          key={pageNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        { disabled: currentPage === pageCount },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={handleForwardButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
