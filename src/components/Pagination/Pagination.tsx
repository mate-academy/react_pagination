import React from 'react';
import cn from 'classnames';

interface Props {
  items: string[];
  countItemsPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const moveToPreviousPage = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const newPage = currentPage - 1 <= 0 ? 1 : currentPage - 1;

  setCurrentPage(newPage);
};

const moveToNextPage = (
  currentPage: number,
  countPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const newPage = currentPage + 1 >= countPage ? countPage : currentPage + 1;

  setCurrentPage(newPage);
};

export const Pagination: React.FC<Props> = ({
  items,
  countItemsPage,
  currentPage,
  setCurrentPage,
}) => {
  const countPage = Math.ceil(items.length / countItemsPage);
  const isCurrentPageDisabled = currentPage === countPage;

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => moveToPreviousPage(currentPage, setCurrentPage)}
          >
            «
          </a>
        </li>
        {[...Array(countPage)].map((_, i) => (
          <li
            className={cn('page-item', { active: i + 1 === currentPage })}
            key={`#${i + 1}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className={cn('page-item', { disabled: isCurrentPageDisabled })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isCurrentPageDisabled}
            onClick={
              () => moveToNextPage(currentPage, countPage, setCurrentPage)
            }
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map((item, index) => (
          (currentPage - 1) * countItemsPage < index + 1
          && currentPage * countItemsPage >= index + 1 && (
            <li data-cy="item" key={item}>
              {item}
            </li>
          )
        ))}
      </ul>
    </>
  );
};
