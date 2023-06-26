type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (tabId: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const arrOfPages = Array.from({
    length: lastPage,
  }, (_v, k) => k + 1);
  const arrOfItems = Array.from({
    length: total,
  }, (_v, k) => k + 1);

  return (
    <>
      <ul className="pagination">
        <li
          className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
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
        {arrOfPages.map(page => (
          <li
            className={page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === lastPage
              ? 'page-item disabled'
              : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={() => {
              if (currentPage !== lastPage) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {arrOfItems.filter(item => {
          if (currentPage === 1) {
            return item <= perPage;
          }

          return item <= perPage * currentPage
          && item > perPage * (currentPage - 1);
        }).map(itemFilter => (
          <li
            data-cy="item"
          >
            {`Item ${itemFilter}`}
          </li>
        ))}
      </ul>
    </>
  );
};
