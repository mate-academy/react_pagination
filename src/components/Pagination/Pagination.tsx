import React, { useMemo } from "react";
import { getNumbers } from "../../utils";
import classNames from "classnames";

type Props = {
    total: number,
    perPage: number,
    currentPage: number,
    onPageChange: (pageNum: number | ((prevPage: number) => number)) => void;
}

export const Pagination: React.FC<Props> = ({
    total,
    perPage,
    currentPage = 1,
    onPageChange,
}) => {
    const pagesCount = useMemo(() => {
        return Math.ceil(total / perPage);
    }, [total, perPage]);

    const pages = getNumbers(1, pagesCount);

    const handleBackwardButton = () => {
        if (currentPage !== 1) {
            onPageChange(prevPage => prevPage - 1);
        }
    }

    const handleForwardButton = () => {
        if (currentPage !== pagesCount) {
            onPageChange(prevPage => prevPage + 1);
        }
    }

    const handlePageChange = (pageNum: number) => {
        onPageChange(pageNum);
    }

    return (
    <ul className="pagination">
      <li 
        className={classNames(
            'page-item',
            {disabled: currentPage === 1}
        )} 
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handleBackwardButton}
        >
          «
        </a>
      </li>
      

      {pages.map(pageNum => (
        <li
          className={classNames(
            'page-item',
            {active: pageNum === currentPage},
          )}
          key={pageNum}
        >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNum}`}
              onClick={() => handlePageChange(pageNum)}
            >
                {pageNum}
            </a>
        </li>
      ))}
     
      <li 
        className={classNames(
            'page-item',
            {disabled: currentPage === pagesCount}
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={handleForwardButton}
        >
          »
        </a>
      </li>
    </ul>
    )
};
