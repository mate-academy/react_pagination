import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const isFirstPageSelected = currentPage === 1;
  const isLastPageSelected = currentPage === pages.length;

  const pageChangeHandler = (page: number) => {
    if (page < 1 || page > numberOfPages) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: isFirstPageSelected })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageSelected}
          onClick={() => pageChangeHandler(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map((page) => (
        <li
          className={classNames('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => pageChangeHandler(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: isLastPageSelected })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageSelected}
          onClick={() => pageChangeHandler(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
