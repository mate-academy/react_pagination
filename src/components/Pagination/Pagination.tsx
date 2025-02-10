import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export function getAmountOfPages(total: number, perPage: number): number {
  return Math.ceil(total / perPage);
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const handleClick = function (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) {
    event.preventDefault();

    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const amountOfPages = getAmountOfPages(total, perPage);

  const isFirstPageOpened = function (): boolean {
    return currentPage <= 1;
  };

  const isLastPageOpened = function (): boolean {
    return currentPage >= amountOfPages;
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: isFirstPageOpened() })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageOpened()}
          onClick={e => handleClick(e, currentPage - 1)}
        >
          «
        </a>
      </li>

      {Array.from({ length: amountOfPages }, (_, index) => {
        const page = index + 1;

        return (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => handleClick(e, page)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={classNames('page-item', {
          disabled: isLastPageOpened(),
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageOpened()}
          onClick={e => handleClick(e, currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
