import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const pagesAmount = Math.ceil(total / perPage);

  function getPagesNumbers(amount: number): number[] {
    const pages = [];

    for (let n = 1; n <= amount; n++) {
      pages.push(n);
    }

    return pages;
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? true : false}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getPagesNumbers(pagesAmount).map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: currentPage === page })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => currentPage !== page && onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === pagesAmount,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesAmount ? true : false}
          onClick={() =>
            currentPage !== pagesAmount && onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
