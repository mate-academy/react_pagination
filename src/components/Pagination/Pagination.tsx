import classNames from 'classnames';
import React from 'react';

type Props = {
  pages: number[];
  currPage: number;
  handelPageChange: (page: number) => void;
  handelPrevPage: () => void;
  handelNextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currPage,
  handelPageChange,
  handelPrevPage,
  handelNextPage,
}) => {
  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currPage === 1}
          onClick={handelPrevPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item', { active: currPage === page })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handelPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currPage === pages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currPage === pages.length}
          onClick={handelNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
