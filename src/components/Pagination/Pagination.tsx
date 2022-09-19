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

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {Array.from(Array(pages).keys()).map(i => {
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
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={() => currentPage < pages && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array.from(Array(perPage).keys()).map(i => {
          const currenItem = (currentPage * perPage) - (perPage) + (i + 1);

          if (currenItem <= total) {
            return (
              <li data-cy="item" key={i + 1}>
                {`Item ${currenItem}`}
              </li>
            );
          }

          return '';
        })}
      </ul>
    </>
  );
};
