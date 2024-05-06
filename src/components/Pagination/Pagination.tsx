import classNames from 'classnames';
import React from 'react';

type Props = {
  currentPage: number;
  changePage: (value: number) => void;
  pages: number[];
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  changePage,
  pages,
}) => {
  const canContinue = currentPage < pages.length;
  const canComeBack = currentPage > 1;

  function nextPage() {
    if (canContinue) {
      changePage(currentPage + 1);
    }
  }

  function previusPage() {
    if (canComeBack) {
      changePage(currentPage - 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: !canComeBack })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!canComeBack}
          onClick={previusPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: currentPage === page })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => changePage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: !canContinue })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!canContinue}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
