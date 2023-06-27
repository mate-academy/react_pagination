import { FC } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  totalItems: number,
  itemsOnPage: number,
  selectedPage: number,
  changePage: (page: number) => void,
}

export const Pagination: FC<Props> = ({
  totalItems,
  itemsOnPage,
  selectedPage,
  changePage,
}) => {
  const totalTabs = Math.ceil(totalItems / itemsOnPage);

  const selectPrevPage = () => {
    if (selectedPage !== 1) {
      changePage(selectedPage - 1);
    }
  };

  const selectNextPage = () => {
    if (selectedPage !== totalTabs) {
      changePage(selectedPage + 1);
    }
  };

  const selectPageOnTab = (item: number) => {
    changePage(item);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: selectedPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={
            selectedPage === 1
              ? 'true'
              : 'false'
          }
          onClick={selectPrevPage}
        >
          «
        </a>
      </li>
      {getNumbers(1, totalTabs).map(item => (
        <li
          className={cn('page-item', {
            active: selectedPage === item,
          })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => selectPageOnTab(item)}
          >
            {item}
          </a>
        </li>
      ))}
      <li className={cn('page-item', {
        disabled: selectedPage === totalTabs,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            selectedPage === totalTabs
              ? 'true'
              : 'false'
          }
          onClick={selectNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
