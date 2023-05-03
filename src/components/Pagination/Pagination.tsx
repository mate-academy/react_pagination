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

  const isPrevEnabled = currentPage > 1;
  const isNextEnabled = !isLastPage;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item',
          {
            disabled: !isPrevEnabled,
          })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!isPrevEnabled}
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
          disabled: !isNextEnabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!isNextEnabled}
          onClick={() => !isLastPage && handleChangePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
