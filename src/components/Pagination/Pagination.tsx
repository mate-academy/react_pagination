import { getNumbers } from '../../utils';

type Props = {
  total:number,
  perPage:number,
  currentPage:number,
  onPageChange:(page: number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const numOfPages = Math.ceil(total / perPage);
  const pageArr = getNumbers(1, numOfPages);

  return (
    <ul className="pagination">
      <li
        className={
          currentPage === pageArr[0]
            ? 'page-item disabled'
            : 'page-item'
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === pageArr[0]}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pageArr.map(pageNum => (
        <li
          className={
            currentPage === pageNum
              ? 'page-item active'
              : 'page-item'
          }
          key={pageNum}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNum}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </a>
        </li>
      ))}

      <li
        className={
          currentPage === pageArr[pageArr.length - 1]
            ? 'page-item disabled'
            : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageArr[pageArr.length - 1]}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
