import { useState } from 'react';
import clasnames from 'classnames';

type PaginationProps = {
  pages: number;

  activePage: number;
  setActivePage: (page: number) => void;

  initList: number[];
  perPageInit: number;

  setVisibleList: (list: number[]) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  pages,
  activePage,
  setActivePage,
  initList,
  perPageInit,
  setVisibleList,
}) => {
  const [goArrow, setGoArrow] = useState(true);
  const [backArrow, setBackArrow] = useState(false);

  const getItemsForPage = (page: number) => {
    const endIndex = perPageInit * page;
    const startIndex = endIndex - perPageInit;

    return [...initList].slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
    const items = getItemsForPage(newPage);

    setVisibleList(items);

    setBackArrow(newPage > 1);
    setGoArrow(newPage < pages);
  };

  const handleNext = () => {
    if (activePage < pages) {
      handlePageChange(activePage + 1);
    }
  };

  const handlePrev = () => {
    if (activePage > 1) {
      handlePageChange(activePage - 1);
    }
  };

  const getPages = (startPages: number) => {
    const pageAmount: number[] = [];

    for (let i = 1; i <= startPages; i++) {
      pageAmount.push(i);
    }

    return pageAmount;
  };

  const publicPages: number[] = getPages(pages);

  return (
    <ul className="pagination">
      <li
        className={clasnames('page-item', {
          disabled: backArrow === false,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => handlePrev()}
        >
          «
        </a>
      </li>

      {publicPages.map(page => (
        <li
          className={clasnames('page-item', {
            active: page === activePage,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={clasnames('page-item', {
          disabled: goArrow === false,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => handleNext()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
