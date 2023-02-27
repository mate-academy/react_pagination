import classNames from 'classnames';
import { getNumbers } from '../../utils';

/* eslint-disable no-console */
type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  currentItems: number[];
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  currentItems,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const allPagesArr = getNumbers(1, lastPage);

  if (!allPagesArr.includes(currentPage)) {
    onPageChange(1);
  }

  const handlePrevLink = () => (
    currentPage !== 1 ? onPageChange(currentPage - 1) : 1
  );

  const handleNextLink = () => (
    currentPage !== lastPage ? onPageChange(currentPage + 1) : lastPage
  );

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevLink}
          >
            «
          </a>
        </li>
        {allPagesArr.map(pageNumber => (
          <li
            key={pageNumber}
            className={classNames(
              'page-item',
              { active: currentPage === pageNumber },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => {
                if (currentPage !== pageNumber) {
                  onPageChange(pageNumber);
                }
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === lastPage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={handleNextLink}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentItems.map(itemNumber => (
          <li
            data-cy="item"
            key={itemNumber}
          >
            {`Item ${itemNumber}`}
          </li>
        ))}
      </ul>
    </>
  );
};
