type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pages = Math.ceil(total / perPage);
  const pagesList = Array.from(Array(pages).keys());
  const itemsList = Array.from(Array(perPage).keys())
    .map(page => {
      const currenPage = (currentPage * perPage) - (perPage) + (page + 1);

      return (currenPage <= total ? currenPage : null);
    })
    .filter(page => page !== null);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pagesList.map(i => {
          return (
            <li
              className={`page-item ${i + 1 === currentPage && 'active'}`}
              key={i + 1}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${i + 1}`}
                onClick={() => onPageChange(i + 1)}
              >
                {i + 1}
              </a>
            </li>
          );
        })}
        <li className={`page-item ${currentPage === pages && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={currentPage === pages}
            onClick={() => currentPage < pages && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsList.map(item => {
          return (
            <li data-cy="item" key={item}>
              {`Item ${item}`}
            </li>
          );
        })}
      </ul>
    </>
  );
};
