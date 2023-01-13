import { FC } from 'react';
import cn from 'classnames';
import { NavigationList } from '../NavigationList/NavigationList';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number
  currentPage: number
  onPageChange: (pageId: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const navListLength = Math.ceil(total / perPage);
  const isLeftButtonAvailable = currentPage <= 1;
  const isRightButtonAvailable = currentPage >= navListLength;
  const navigationList = getNumbers(1, navListLength);

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: isLeftButtonAvailable },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isLeftButtonAvailable}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        <NavigationList
          list={navigationList}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <li className={cn(
          'page-item',
          { disabled: isRightButtonAvailable },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isRightButtonAvailable}
            onClick={() => {
              if (currentPage < navListLength) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
