import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

export interface Props {
  total: number,
  itemsInPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: FC<Props> = ({
  total,
  itemsInPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = getNumbers(1, Math.ceil(total / itemsInPage));

  return (
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
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pagesCount.map(page => (
        <li
          className={classNames(
            'page-item',
            { active: currentPage === page },
          )}
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

      <li
        className={classNames(
          'page-item',
          { disabled: pagesCount.length === currentPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={pagesCount.length === currentPage}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
