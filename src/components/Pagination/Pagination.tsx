type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
};

function getCountOfPages(totalItems: number, countOfVisisbleItems: number) {
  const arr = [];

  if (totalItems <= 0) {
    return [];
  }

  for (let i = 1; i <= Math.ceil(totalItems / countOfVisisbleItems); i++) {
    arr.push(i);
  }

  return arr;
}

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const countOfPages = getCountOfPages(total, perPage);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? true : false}
            onClick={e => {
              e.preventDefault();
              if (countOfPages && currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {countOfPages &&
          countOfPages.map(page => (
            <li
              className={`page-item ${page === currentPage ? 'active' : ''}`}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={e => {
                  e.preventDefault();
                  if (page !== currentPage) {
                    onPageChange(page);
                  }
                }}
              >
                {page}
              </a>
            </li>
          ))}
        <li
          className={`page-item ${countOfPages && currentPage === countOfPages[countOfPages.length - 1] ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              countOfPages &&
              currentPage === countOfPages[countOfPages.length - 1]
                ? true
                : false
            }
            onClick={e => {
              e.preventDefault();
              if (
                countOfPages &&
                currentPage < countOfPages[countOfPages.length - 1]
              ) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
