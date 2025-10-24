import classNames from 'classnames';
import { FC, MouseEvent } from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSwitchPageDown = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleSwitchPageUp = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleSwitchPageDown}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li
          className={classNames('page-item', { active: currentPage === page })}
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
        className={classNames('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleSwitchPageUp}
        >
          »
        </a>
      </li>
    </ul>
  );
};
