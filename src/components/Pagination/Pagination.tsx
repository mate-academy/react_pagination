import classNames from 'classnames';

type Params = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Params) => {
  const numberOfPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const nextPageClick = () => onPageChange(currentPage + 1);
  const prevPageClick = () => onPageChange(currentPage - 1);
  const setPageClick = (page: number) => onPageChange(page);

  const pagesList = Array.from({ length: numberOfPages }, (_, index) => {
    const current = index + 1;
    const isActive = current === currentPage;

    return (
      <li
        className={classNames('page-item', { active: isActive })}
        key={'page-item-' + current}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={'#' + current}
          onClick={() => {
            if (current !== currentPage) {
              setPageClick(current);
            }
          }}
        >
          {current}
        </a>
      </li>
    );
  });

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => {
              if (!isFirstPage) {
                prevPageClick();
              }
            }}
          >
            «
          </a>
        </li>
        {pagesList}
        <li className={classNames('page-item', { disabled: isLastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => {
              if (!isLastPage) {
                nextPageClick();
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
