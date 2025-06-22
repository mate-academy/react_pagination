import classNames from 'classnames';

import { getNumbers } from '../../utils';

interface Props {
  pageNumber: number;
  maxPagesCount: number;
  onClick: (newValue: number) => void;
}

export const Pagination = ({ pageNumber, maxPagesCount, onClick }: Props) => {
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === maxPagesCount;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              onClick(pageNumber - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, maxPagesCount).map(n => (
        <li
          className={classNames('page-item', { active: n === pageNumber })}
          key={`page_${n}`}
          onClick={() => {
            onClick(n);
          }}
        >
          <a data-cy="pageLink" className="page-link" href={`#${n}`}>
            {n}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              onClick(pageNumber + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
