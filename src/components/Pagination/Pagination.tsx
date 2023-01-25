import cn from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: Dispatch<SetStateAction<number>>,
};

export const Pagination: FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange: setCurrentPage,
  },
) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === pages[0];
  const isLastPage = currentPage === pages[pages.length - 1];

  const handleClickPrevNext = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (event.currentTarget.href.includes('#next')) {
      setCurrentPage(
        (state) => state + 1,
      );
    } else {
      setCurrentPage(
        (state) => state - 1,
      );
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: isFirstPage },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={handleClickPrevNext}
          >
            «
          </a>
        </li>

        {pages.map(pageNum => (
          <li
            className={cn(
              'page-item',
              { active: pageNum === currentPage },
            )}
            key={pageNum}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNum}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </a>
          </li>
        ))}

        <li className={cn(
          'page-item',
          { disabled: isLastPage },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={(event) => {
              if (event.currentTarget.href.includes('#next')) {
                setCurrentPage(
                  (state) => state + 1,
                );
              } else {
                setCurrentPage(
                  (state) => state - 1,
                );
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        <li data-cy="item">Item 1</li>
        <li data-cy="item">Item 2</li>
        <li data-cy="item">Item 3</li>
        <li data-cy="item">Item 4</li>
        <li data-cy="item">Item 5</li>
      </ul>
    </>
  );
};
