import React from 'react';
import cn from 'classnames';

import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const itemsPerPage = getNumbers(
    perPage * currentPage - perPage + 1, currentPage * perPage,
  );

  const itemsLink = getNumbers(1, Math.ceil(total / perPage));

  return (
    <>
      <ul className="pagination">
        <li
          className={cn(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {
          itemsLink.map(link => (
            <li className={
              cn(
                'page-item',
                {
                  active: link === currentPage,
                },
              )
            }
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${link}`}
                onClick={() => onPageChange(link)}
              >
                {link}
              </a>
            </li>
          ))
        }

        <li
          className={
            cn(
              'page-item',
              {
                disabled: itemsLink[itemsLink.length - 1] === currentPage,
              },
            )
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={itemsLink[itemsLink.length - 1] === currentPage}
            onClick={() => {
              if (currentPage !== itemsLink[itemsLink.length - 1]) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {
          itemsPerPage.map(n => {
            if (n <= total) {
              return (
                <li data-cy="item">{`Item ${n}`}</li>
              );
            }

            return false;
          })
        }
      </ul>
    </>
  );
};
