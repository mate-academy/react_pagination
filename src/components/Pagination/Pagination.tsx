import classNames from 'classnames';
import { FC } from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const countOfPage = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === countOfPage;

  const pages: number[] = [];

  for (let i = 1; i <= countOfPage; i += 1) {
    pages[i - 1] = i;
  }

  const handleClickOnRightButton = () => {
    if (currentPage < countOfPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleClickOnLeftButton = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', {
          disabled: isFirstPage,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={handleClickOnLeftButton}
          >
            «
          </a>
        </li>
        { pages.map(page => (
          <li
            className={classNames('page-item', {
              active: page === currentPage,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames('page-item', {
          disabled: isLastPage,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={handleClickOnRightButton}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
