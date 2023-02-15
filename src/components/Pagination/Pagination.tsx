import classNames from "classnames";
import { getNumbers } from "../../utils";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages =
    total % perPage === 0 ? total / perPage : Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  const lastPage = currentPage === totalPages;
  const firstPage = currentPage === 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const pageChangeHandler = (page: number) => {
    if (page < totalPages || page < 1) {
      onPageChange(page);
    }
    return;
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames("page-item", { disabled: firstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${prevPage}`}
            aria-disabled={firstPage}
            onClick={() => pageChangeHandler(prevPage)}
          >
            «
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={classNames("page-item", {
              active: currentPage === page,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames("page-item", { disabled: lastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${nextPage}`}
            aria-disabled={lastPage}
            onClick={() => pageChangeHandler(nextPage)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
