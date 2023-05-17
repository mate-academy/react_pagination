import classNames from 'classnames';

import { getNumbers, getItemsToShowIndex } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const numberOfPages = Math.ceil(total / perPage);

  const [from, to] = getItemsToShowIndex(perPage, currentPage, total);
  const items = getNumbers(from, to).map(n => `Item ${n}`);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const isActive = (page: number) => currentPage === page;

  const handlePrevButtonClick = () => !isFirstPage
    && onPageChange(currentPage - 1);

  const handleNextButtonClick = () => !isLastPage
    && onPageChange(currentPage + 1);

  return (
    <>
      <ul className="pagination">
        <li className={
          classNames('page-item', {
            disabled: isFirstPage,
          })
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage ? 'true' : 'false'}
            onClick={handlePrevButtonClick}
          >
            «
          </a>
        </li>
        {
          getNumbers(1, numberOfPages).map(page => (
            <li
              className={classNames('page-item', {
                active: isActive(page),
              })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => !isActive(page)
                  && onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))
        }

        <li className={
          classNames('page-item', {
            disabled: isLastPage,
          })
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage ? 'true' : 'false'}
            onClick={handleNextButtonClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => <li key={item} data-cy="item">{item}</li>)}
      </ul>
    </>
  );
};
