import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const pages = Math.ceil(total / perPage);
  const visiblePages = [];
  const visibleItems = [];

  for (let i = 1; i <= pages; i += 1) {
    visiblePages.push(i);
  }

  for (let i = 1; i <= perPage; i += 1) {
    visibleItems.push(i + perPage * (currentPage - 1));
  }

  const prevPagetHandler = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPage < pages) {
      onPageChange(currentPage + 1);
    }
  };

  const switchPage = (newPage: number) => {
    if (newPage === currentPage) {
      return;
    }

    onPageChange(newPage);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={prevPagetHandler}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {visiblePages.map(page => {
          return (
            <li
              className={classNames(
                'page-item',
                { active: currentPage === page },
              )}
              key={`page-${page}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={() => {
                  switchPage(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === pages },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={nextPageHandler}
            aria-disabled={currentPage === pages}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.filter(item => item <= total).map(item => {
          return (
            <li
              data-cy="item"
              key={`page-${item}`}
            >
              {`Item ${item}`}
            </li>
          );
        })}
      </ul>
    </>
  );
};
