import React from 'react';
import cn from 'classnames';
import { arrangeItems, getNumbers } from '../../utils';

type Props = {
  total: number; // total number of items to paginate
  perPage: number; // number of items per page
  currentPage: number /* optional with 1 by default */;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, total).map((n) => `Item ${n}`);

  const pages = Math.ceil(total / perPage);
  const links = getNumbers(1, pages);

  const arrengedItems = arrangeItems(items, perPage, currentPage);

  const handleOnClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === links[0],
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={
              currentPage === links[0] ? 'true' : 'false'
            }
            onClick={() => {
              if (currentPage > 1) {
                handleOnClick(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {links.map((link) => (
          <li
            key={link}
            className={cn('page-item', {
              active: currentPage === link,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#{link}"
              onClick={() => handleOnClick(link)}
            >
              {link}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === links[links.length - 1],
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === links[links.length - 1] ? 'true' : 'false'
            }
            onClick={() => {
              if (currentPage < links[links.length - 1]) {
                handleOnClick(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {arrengedItems.map((item) => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
