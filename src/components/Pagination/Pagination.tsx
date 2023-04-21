import classNames from 'classnames';

type Props = {
  items: string[],
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number | string) => void,
};

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);

  const endIndexVisibleItems = currentPage * perPage;
  const startIndexVisibleItems = endIndexVisibleItems - perPage;

  const disableNextButton = currentPage === numberOfPages;
  const disablePrevButton = currentPage === 1;

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            {
              disabled: disablePrevButton,
            },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={disablePrevButton}
            onClick={() => onPageChange('prev')}
          >
            «
          </a>
        </li>

        {items.slice(0, numberOfPages).map((item, i) => {
          const pageNumber = i + 1;

          return (
            <li
              key={item}
              className={classNames(
                'page-item',
                {
                  active: pageNumber === currentPage,
                },
              )}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${pageNumber}`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}

        <li
          className={classNames(
            'page-item',
            {
              disabled: disableNextButton,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={disableNextButton}
            onClick={() => onPageChange('next')}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.slice(startIndexVisibleItems, endIndexVisibleItems).map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
