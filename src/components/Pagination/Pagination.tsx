import classNames from 'classnames';

type Props = {
  items: string[],
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = [];
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const prevPage = (page: number) => () => {
    if (page > 0 && page !== 1) {
      onPageChange(page - 1);
    }
  };

  const nextPage = (page: number) => () => {
    if (page < pagesCount && page !== pagesCount) {
      onPageChange(page + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: isFirstPage },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={prevPage(currentPage)}
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
              href="#1"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            { disabled: isLastPage },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={nextPage(currentPage)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
