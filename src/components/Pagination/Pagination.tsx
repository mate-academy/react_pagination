import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number, // total number of items to paginate
  perPage: number, // number of items per page
  currentPage: number, /* optional with 1 by default */
  onPageChange: (page: number) => void;
};

enum MovePage {
  Next = 'next',
  Prev = 'prev',
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfItems = Math.ceil(total / perPage);
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === amountOfItems;

  const handlerClick = (pageId: number) => {
    if (pageId !== currentPage) {
      onPageChange(pageId);
    }
  };

  const movePage = (move: MovePage) => {
    let moveTo = 1;

    switch (move) {
      case MovePage.Next:
        moveTo = currentPage + 1;
        break;

      case MovePage.Prev:
        moveTo = currentPage - 1;
        break;

      default:
        throw new Error('unexpected moving type');
    }

    onPageChange(moveTo);
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: prevDisabled,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevDisabled}
          onClick={() => {
            if (!prevDisabled) {
              movePage(MovePage.Prev);
            }
          }}
        >
          «
        </a>
      </li>
      {[...Array(amountOfItems)].map((_, index) => (
        <li
          key={Math.random()}
          className={classNames(
            'page-item',
            {
              active: currentPage === index + 1,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={() => {
              handlerClick(index + 1);
            }}
          >
            {`${index + 1}`}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        {
          disabled: nextDisabled,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextDisabled}
          onClick={() => {
            if (!nextDisabled) {
              movePage(MovePage.Next);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
