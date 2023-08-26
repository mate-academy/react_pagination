import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  items: string[],
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (currentPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfLinks = Math.ceil(total / perPage);
  const handleLinkClick = (link: number) => {
    if (link !== currentPage) {
      onPageChange(link);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={
          cn('page-item', { disabled: currentPage === 1 })
        }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage !== 1) {
                handleLinkClick(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {getNumbers(1, numberOfLinks).map((link) => (
          <li className={cn('page-item', { active: link === currentPage })}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${link}`}
              onClick={() => handleLinkClick(link)}
            >
              {link}
            </a>
          </li>
        ))}

        <li className={
          cn('page-item', { disabled: currentPage === numberOfLinks })
        }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfLinks}
            onClick={() => {
              if (currentPage !== numberOfLinks) {
                handleLinkClick(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item) => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
