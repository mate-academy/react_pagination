import React from 'react';
import classNames from 'classnames';
import { getPageNumber } from '../../helpers/helpers';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPageId: number;
  onPageLinkClick: (id: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPageId,
  onPageLinkClick = () => {},
}) => {
  const pageNumberList = getPageNumber(total, perPage);

  const activePage =
    pageNumberList.find(page => page.id === currentPageId) || undefined;

  const isFirstPage = activePage?.id === 1;
  const isLastPage =
    activePage?.id === pageNumberList[pageNumberList.length - 1].id;

  const onLeftIconClick = (id: number | undefined) => {
    if (id && !isFirstPage) {
      onPageLinkClick(id - 1);
    }
  };

  const onRightIconClick = (id: number | undefined) => {
    if (id && !isLastPage) {
      onPageLinkClick(id + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => onLeftIconClick(activePage?.id)}
        >
          «
        </a>
      </li>
      {pageNumberList.map(page => (
        <li
          key={page.id}
          className={classNames('page-item', {
            active: activePage?.id === page.id,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page.id}`}
            onClick={() => onPageLinkClick(page.id)}
          >
            {page.value}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => onRightIconClick(activePage?.id)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
