/* eslint-disable react/no-array-index-key */
import { FC, useEffect, useMemo } from 'react';
import './Pagination.scss';
import classnames from 'classnames';

type Props = {
  totalPages: number,
  currentPage: number,
  itemsPerPage: number,
  totalItems: number,
  onPageChange: CallableFunction,
  withInfo: boolean,
};

export const Pagination: FC<Props> = ({
  totalPages,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  withInfo,
}) => {
  const buttonsArray = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages, itemsPerPage]);

  const minPage = currentPage > 2 ? currentPage : 2;
  const threeDots = '...';
  const firstPage = 1;
  let middle: (string | number)[] | [] = [];
  const lastPage = totalPages;

  let visibleButtons: (string | number)[] | []
    = [...buttonsArray].slice(0, minPage);

  switch (true) {
    case totalPages <= 3:
      if (currentPage < totalPages) {
        visibleButtons.push(lastPage);
      }

      break;

    case totalPages > 3 && totalPages <= 5:
      if (currentPage < totalPages - 2) {
        visibleButtons.push(threeDots);
      }

      if (currentPage === totalPages - 2) {
        visibleButtons.push(currentPage + 1);
      }

      if (currentPage < totalPages) {
        visibleButtons.push(lastPage);
      }

      break;

    default:
      if (currentPage <= 3) {
        visibleButtons.push(threeDots);
        visibleButtons.push(lastPage);
      }

      if (currentPage > 3) {
        middle = [
          currentPage - 1,
          currentPage,
          currentPage + 1,
        ];

        if (currentPage > 3) {
          middle.unshift(threeDots);
        }

        if (currentPage < totalPages - 2) {
          middle.push(threeDots);
        }

        if (currentPage >= totalPages - 2) {
          const last5pages
          = Array.from({ length: 4 }, (_, i) => lastPage - 4 + i);

          middle = [
            threeDots,
            ...last5pages,
          ];
        }

        visibleButtons = [
          firstPage,
          ...middle,
          lastPage,
        ];
      }

      break;
  }

  useEffect(() => {
    if (currentPage >= totalPages) {
      return onPageChange(totalPages);
    }

    return onPageChange(currentPage);
  }, [totalPages]);

  return (
    <>
      <ul className="pagination">
        <li>
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {'<'}
          </button>
        </li>
        {
          visibleButtons.map((button, index) => {
            return (
              <li key={`${index}-${button}`}>
                <button
                  type="button"
                  disabled={button === '...'}
                  className={classnames({ active: button === currentPage })}
                  onClick={() => onPageChange(button)}
                >
                  {button}
                </button>
              </li>
            );
          })
        }

        <li>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}

          >
            {'>'}
          </button>
        </li>
      </ul>

      {withInfo && (
        <div className="Pagination__info">
          <h3>
            {'Current Page: '}
            {currentPage}
          </h3>
          <h3>
            {'Number of pages: '}
            {totalPages}
          </h3>
          <h3>
            {'Showing items: '}
            {currentPage * itemsPerPage - itemsPerPage + 1}
            {' - '}
            {
              currentPage * itemsPerPage >= totalItems
                ? totalItems
                : currentPage * itemsPerPage
            }
            {' of '}
            {totalItems}
          </h3>
        </div>
      )}
    </>

  );
};
