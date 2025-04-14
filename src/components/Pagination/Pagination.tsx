import { FC } from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<number>;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);

  const lastPage = pages.length;
  const firstPage = 1;

  const handleSelectedPage = (page: number): void => {
    onPageChange(page);
  };

  const handleSelectedNextPage = (): void => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleSelectedPrevPage = (): void => {
    if (currentPage > firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === firstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === firstPage}
          onClick={() => {
            handleSelectedPrevPage();
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => {
        return (
          <li
            className={cn('page-item', {
              active: currentPage === page,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handleSelectedPage(page)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item', {
          disabled: currentPage === lastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === lastPage}
          onClick={() => {
            handleSelectedNextPage();
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
