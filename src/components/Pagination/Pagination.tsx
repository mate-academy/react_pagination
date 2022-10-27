import React from 'react';
import className from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  items: string[]
  perPage: number;
  currentPage: number;
  onPageChange: (x: number) => void
  total: number
};

export const Pagination: React.FC<Props> = ({
  items,
  perPage,
  currentPage,
  onPageChange,
  total,
}) => {
  const pageItems = Math.ceil(total / perPage);
  const pageItemsRender = getNumbers(1, pageItems);

  const startRender = (currentPage - 1) * perPage;
  const endRender = currentPage * perPage;

  return (
    <>
      <ul className="pagination">
        <li className={className(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>
        {pageItemsRender.map(number => {
          return (
            <li className={className(
              'page-item',
              { active: currentPage === number },
            )}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
                onClick={() => {
                  onPageChange(number);
                }}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className={className(
          'page-item',
          { disabled: currentPage === pageItems },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(item => (
          <li data-cy="item">{item}</li>
        )).slice(startRender, endRender)}
      </ul>
    </>
  );
};
