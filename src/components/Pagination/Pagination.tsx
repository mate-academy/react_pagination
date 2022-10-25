import React from 'react';
import className from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  items: string[]
  itemsPerPage: number;
  activePageLink: number;
  setActivePageLink: (x: number) => void
  startRender: number
  endRender: number
};

export const Pagination: React.FC<Props> = ({
  items,
  itemsPerPage,
  activePageLink,
  setActivePageLink,
  startRender,
  endRender,
}) => {
  const itemsRender = items.map(item => (
    <li data-cy="item">{item}</li>
  ));

  const pageItems = Math.ceil(itemsRender.length / itemsPerPage);
  const pageItemsRender = getNumbers(1, pageItems);

  return (
    <>
      <ul className="pagination">
        <li className={className(
          'page-item',
          { disabled: activePageLink === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              setActivePageLink(activePageLink - 1);
            }}
          >
            «
          </a>
        </li>
        {pageItemsRender.map(number => {
          return (
            <li className={className(
              'page-item',
              { active: activePageLink === number },
            )}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
                onClick={() => {
                  setActivePageLink(number);
                }}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className={className(
          'page-item',
          { disabled: activePageLink === pageItems },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => {
              setActivePageLink(activePageLink + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsRender.slice(startRender, endRender)}
      </ul>
    </>
  );
};
