import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);
  const isCurrentFirst = currentPage === 1;
  const isCurrentLast = currentPage === lastPage;

  const handlePrev = () => {
    if (!isCurrentFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isCurrentLast) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: isCurrentFirst },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${pages[currentPage - 1]}`}
          aria-disabled={isCurrentFirst}
          onClick={() => handlePrev()}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
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

      <li className={classNames(
        'page-item',
        { disabled: isCurrentLast },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${pages[currentPage + 1]}`}
          aria-disabled={isCurrentLast}
          onClick={() => handleNext()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
