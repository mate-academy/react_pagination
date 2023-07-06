import classNames from 'classnames';

import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesNumber = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesNumber);
  const isFirst = currentPage === 1;
  const isCur = (thisPage: number) => currentPage === thisPage;
  const isLast = currentPage === pagesNumber;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: isFirst },
      )}
      >
        <a
          onClick={() => {
            if (!isFirst) {
              onPageChange(currentPage - 1);
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: isCur(page) },
          )}
        >
          <a
            onClick={() => {
              if (!isCur(page)) {
                onPageChange(page);
              }
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        { disabled: isLast },
      )}
      >
        <a
          onClick={() => {
            if (!isLast) {
              onPageChange(currentPage + 1);
            }
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesNumber}
        >
          »
        </a>
      </li>
    </ul>
  );
};
