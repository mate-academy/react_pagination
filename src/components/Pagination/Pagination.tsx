import React from 'react';
import classNames from 'classnames';

type Props = {
  perPage: number,
  allItems: string[],
  onPageChange: (event: React.MouseEvent<HTMLElement>) => void,
  paginationButtons: number[],
  selectedPage: number,
};

export const Pagination: React.FC<Props> = ({
  perPage,
  allItems,
  onPageChange,
  paginationButtons,
  selectedPage,
}) => {
  const onThisPage = allItems
    .filter((_, i) => (
      i >= (selectedPage * perPage - perPage)
      && i < (selectedPage * perPage)
    ));

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: selectedPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            id="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={selectedPage === 1}
            onClick={onPageChange}
          >
            «
          </a>
        </li>

        {paginationButtons.map(button => (
          <li
            key={button}
            className={classNames('page-item', {
              active: button === selectedPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${button}`}
              onClick={onPageChange}
            >
              {button}
            </a>
          </li>
        ))}

        <li
          className={classNames('page-item', {
            disabled: selectedPage === paginationButtons.length,
          })}
        >
          <a
            data-cy="nextLink"
            id="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={selectedPage === paginationButtons.length}
            onClick={onPageChange}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {allItems.map((item) => {
          return onThisPage.includes(item) && (
            <li key={item} data-cy="item">{item}</li>
          );
        })}
      </ul>
    </>
  );
};
