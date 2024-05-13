import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function getButtons(total: number, perPage: number) {
  const numberButtons = Math.ceil(total / perPage);
  const arr: number[] = [];

  for (let i = 1; i <= numberButtons; i++) {
    arr.push(i);
  }

  return arr;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const visibleButtons = getButtons(total, perPage);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = event.target as HTMLAnchorElement;
    const page = parseInt(target.dataset.page ?? '1');
    onPageChange(page);
  }
  

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          data-page={currentPage - 1}
          onClick={handleClick}
        >
          «
        </a>
      </li>

      {visibleButtons.map((buttonNumber: number) => (
        <li
          className={
            currentPage === buttonNumber
              ? cn('page-item active')
              : cn('page-item')
          }
          key={buttonNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#{buttonNumber}"
            data-page={buttonNumber}
            onClick={event =>
              onPageChange(
                parseInt(
                  (event.target as HTMLAnchorElement).dataset.page ?? '1',
                ),
              )
            }
          >
            {buttonNumber}
          </a>
        </li>
      ))}

      <li
        className={
          currentPage === visibleButtons[visibleButtons.length - 1]
            ? 'page-item disabled'
            : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          data-page={currentPage + 1}
          onClick={event =>
            onPageChange(
              parseInt((event.target as HTMLAnchorElement).dataset.page ?? '1'),
            )
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
