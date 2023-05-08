import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  onPageChange: (number: number) => void;
  currentPage: number;
  perPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  onPageChange: handleChangePage,
  currentPage,
  perPage,
}) => {
  const totalPageSelectors = Math.ceil(total / perPage);
  const pageSelectors = getNumbers(1, totalPageSelectors);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageSelectors;

  const isPrevDisabled = isFirstPage;
  const isNextDisabled = isLastPage;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item',
          {
            disabled: isPrevDisabled,
          })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!isPrevDisabled}
          onClick={() => !isFirstPage && handleChangePage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pageSelectors.map(pageSelector => (
        <li
          className={
            classNames('page-item', {
              active: pageSelector === currentPage,
            })
          }
          key={pageSelector}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageSelector}`}
            onClick={() => handleChangePage(pageSelector)}
          >
            {pageSelector}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isNextDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={() => !isLastPage && handleChangePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
