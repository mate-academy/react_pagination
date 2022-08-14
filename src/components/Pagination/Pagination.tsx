import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total, perPage, currentPage, onPageChange,
}: Props) => {
  const countPage = Math.ceil(total / perPage);
  const pages = new Array(countPage).fill(0).map((_, i) => i + 1);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === countPage;

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: isPrevDisabled },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${pages[currentPage - 1]}`}
          aria-disabled={isPrevDisabled}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: currentPage === page },
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
      <li
        className={classNames(
          'page-item',
          { disabled: isNextDisabled },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${pages[currentPage + 1]}`}
          aria-disabled={isNextDisabled}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
