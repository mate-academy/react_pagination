import classNames from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pageNumber = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const firstItemOnPage = Math.min((currentPage - 1) * perPage + 1, total);
  const lastItemOnPage = Math.min(currentPage * perPage, total);

  const itemsOnPage: number[] = [];

  for (let i = firstItemOnPage; i <= lastItemOnPage; i++) {
    itemsOnPage.push(i);
  }

  return (
    <>
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
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pageNumber.map(page => {
          return (
            <li
              className={classNames('page-item', {
                active: page === currentPage,
              })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className={classNames('page-link', {})}
                href={`#${page}`}
                onClick={() => {
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li
          className={classNames('page-item', {
            disabled: currentPage === pageNumber[pageNumber.length - 1],
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageNumber[pageNumber.length - 1]}
            onClick={() => {
              if (currentPage !== pageNumber[pageNumber.length - 1]) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsOnPage.map(item => (
          <li data-cy="item" key={item}>
            Item {item}
          </li>
        ))}
      </ul>
    </>
  );
};
