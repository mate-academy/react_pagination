import { items } from '../../App';
type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

function getCountOfPages(totalItems: number, countOfVisisbleItems: number) {
  const arr = [];

  for (let i = 1; i <= Math.ceil(totalItems / countOfVisisbleItems); i++) {
    arr.push(i);
  }

  return arr;
}

function getVisibleItems(
  allItems: string[],
  amountOfVisibleItems: number,
  page: number,
) {
  const start = (page - 1) * amountOfVisibleItems;
  const end = start + amountOfVisibleItems;

  return allItems.slice(start, end);
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countOfPages = getCountOfPages(total, perPage);
  const dividedItems = getVisibleItems(items, perPage, currentPage);

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
              if (currentPage > countOfPages[0]) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {countOfPages.map(page => (
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
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === countOfPages[countOfPages.length - 1] ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === countOfPages[countOfPages.length - 1]
                ? true
                : false
            }
            onClick={e => {
              e.preventDefault();
              if (currentPage < countOfPages[countOfPages.length - 1]) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {dividedItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
