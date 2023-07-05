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
  const ifFirst = () => currentPage === 1;
  const ifCur = (thisPage: number) => currentPage === thisPage;
  const ifLast = () => currentPage === pagesNumber;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: ifFirst() },
      )}
      >
        <a
          onClick={() => {
            if (!ifFirst()) {
              onPageChange(currentPage - 1);
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={ifFirst()}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: ifCur(page) },
          )}
        >
          <a
            onClick={() => {
              if (!ifCur(page)) {
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
        { disabled: ifLast() },
      )}
      >
        <a
          onClick={() => {
            if (!ifLast()) {
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
