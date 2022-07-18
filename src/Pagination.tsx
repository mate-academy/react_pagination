import { useState, useEffect } from 'react';
import classNames from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  page: number;
  onPageChange: HandlePageChange;
}

type HandlePageChange = (newPage: number) => void;

function getArrayOfNumbers(numberCount: number, perPage: number): number[] {
  const formula = numberCount / perPage;
  const pagesNeeded = Number.isInteger(formula)
    ? formula
    : Math.floor(formula) + 1;

  return new Array(pagesNeeded).fill(null).map((_, index) => {
    return index + 1;
  });
}

const perPageOptions = [3, 5, 10, 20];

export const Pagination = ({
  total,
  perPage = 5,
  page = 1,
  onPageChange,
}: PaginationProps) => {
  const [previousPage, updatePreviousPage] = useState(page - 1);
  const [nextPage, updateNextPage] = useState(page + 1);
  const [itemsPerPage, onPerPageChange] = useState(perPage);
  const currentPageNeighboursLength = 2;
  const paginationNumbers = getArrayOfNumbers(total, itemsPerPage);
  const paginationNumbersForRender = paginationNumbers.filter(
    number => number + 1 === page || number - 1 === page || number === page,
  );
  const totalPagesCount = paginationNumbers.length;

  useEffect(() => {
    updatePreviousPage(page - 1);
    updateNextPage(page + 1);
  }, [page]);

  const handlePageChange: HandlePageChange = (newPage) => {
    if (newPage > totalPagesCount || newPage < 1) {
      return;
    }

    onPageChange(newPage);
  };

  return (
    <>
      <div className="perPage__select">
        <label>
          Per page: &nbsp;

          <select
            name="perPage"
            onChange={(event) => onPerPageChange(+event.target.value)}
          >
            {perPageOptions.map(optionValue => (
              <option value={optionValue} key={optionValue}>
                {optionValue}
              </option>
            ))}
          </select>
        </label>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={classNames('page-item', {
              disabled: page === 1,
            })}
            onClick={() => handlePageChange(previousPage)}
            aria-hidden="true"
          >
            <a
              className="page-link"
              href={`#${previousPage}`}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {page > currentPageNeighboursLength && (
            <>
              <li
                className="page-item"
                onClick={() => handlePageChange(1)}
                aria-hidden="true"
              >
                <a
                  className="page-link"
                  href="#1"
                >
                  1
                </a>
              </li>

              {page > currentPageNeighboursLength + 1 && (
                <li className="page-item disabled">
                  <span className="page-link" aria-hidden="true">...</span>
                </li>
              )}
            </>
          )}

          {paginationNumbersForRender
            .map((pageNumber) => {
              return (
                <li
                  className={classNames('page-item', {
                    active: page === pageNumber,
                  })}
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  aria-hidden="true"
                >
                  <a
                    className="page-link"
                    href={`#${pageNumber}`}
                  >
                    {pageNumber}
                  </a>
                </li>
              );
            })}

          {page <= totalPagesCount - currentPageNeighboursLength && (
            <>
              {page < totalPagesCount - currentPageNeighboursLength && (
                <li className="page-item disabled">
                  <span className="page-link" aria-hidden="true">...</span>
                </li>
              )}

              <li
                className="page-item"
                onClick={() => handlePageChange(totalPagesCount)}
                aria-hidden="true"
              >
                <a
                  className="page-link"
                  href={`#${totalPagesCount}`}
                >
                  {totalPagesCount}
                </a>
              </li>
            </>
          )}

          <li
            className={classNames('page-item', {
              disabled: page === totalPagesCount,
            })}
            onClick={() => handlePageChange(nextPage)}
            aria-hidden="true"
          >
            <a
              className="page-link"
              href={`#${nextPage}`}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
