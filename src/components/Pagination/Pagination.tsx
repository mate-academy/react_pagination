import classNames from "classnames";
import { getNumbers } from "../../utils";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pagesCount;
  const pages = getNumbers(1, pagesCount);

  const handlPageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames("page-item", { disabled: firstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames("page-item", { active: page === currentPage })}
        >
          <a
            href={`#${page}`}
            data-cy="pageLink"
            className="page-link"
            onClick={() => handlPageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames("page-item", { disabled: lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
