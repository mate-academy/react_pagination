import classNames from 'classnames';
import React from 'react';

interface Props {
  items: string[],
  startItem: number,
  endItem: number,
  total: number,
  perPage: string,
  currentPage: string,
  onPageChange: React.Dispatch<React.SetStateAction<string>>,
}

export const Pagination: React.FC<Props> = ({
  items,
  startItem,
  endItem,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const visibleItems = items.slice(startItem - 1, endItem);
  const getCountPages = () => {
    const count = total / +perPage;

    if (!(count % 1)) {
      return count;
    }

    return Math.trunc(count) + 1;
  };

  const countPages = getCountPages();

  const visiblePage = new Array(+countPages)
    .fill(1)
    .map((elem, index) => elem + index);

  const isDisabledPrev = +currentPage === 1;
  const isDisabledNext = +currentPage === countPages;
  const handleClickPrev = () => {
    if (isDisabledPrev) {
      return;
    }
    onPageChange((page => `${+page - 1}`));
  };

  const handleClickNext = () => {
    if (isDisabledNext) {
      return;
    }
    onPageChange((page => `${+page + 1}`));
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={
            classNames(
              'page-item',
              { disabled: isDisabledPrev },
            )
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isDisabledPrev}
            onClick={handleClickPrev}
          >
            «
          </a>
        </li>
        {visiblePage.map((page) => (
          <li
            className={
              classNames(
                'page-item',
                { active: +currentPage === page },
              )
            }
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(`${page}`)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            classNames(
              'page-item',
              { disabled: isDisabledNext },
            )
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isDisabledNext}
            onClick={handleClickNext}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
