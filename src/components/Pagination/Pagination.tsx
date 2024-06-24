import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Params = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Params) => {
  const numberOfPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const nextPageClick = () => onPageChange(currentPage + 1);
  const prevPageClick = () => onPageChange(currentPage - 1);

  const pagesList = getNumbers(1, numberOfPages);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              prevPageClick();
            }
          }}
        >
          «
        </a>
      </li>
      {pagesList.map(current => {
        const isActive = current === currentPage;

        return (
          <li
            className={classNames('page-item', { active: isActive })}
            key={'page-item-' + current}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={'#' + current}
              onClick={() => {
                if (current !== currentPage) {
                  onPageChange(current);
                }
              }}
            >
              {current}
            </a>
          </li>
        );
      })}
      <li className={classNames('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              nextPageClick();
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
