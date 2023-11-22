import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page:number) => void
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttonCount = Math.ceil(total / perPage);
  const buttonArray = getNumbers(1, buttonCount);
  const downDisabled = currentPage === 1;
  const upDisabled = currentPage === buttonCount;

  const handlerDown = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handlerUp = () => currentPage < buttonCount
    && onPageChange(currentPage + 1);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: downDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={downDisabled ? 'true' : 'false'}
          onClick={handlerDown}
        >
          «
        </a>
      </li>
      {buttonArray.map(buttonItem => {
        return (
          <li
            className={cn('page-item', {
              active: buttonItem === currentPage,
            })}
            key={buttonItem}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${buttonItem}`}
              onClick={() => onPageChange(buttonItem)}
            >
              {buttonItem}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item', {
          disabled: currentPage === buttonCount,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={upDisabled ? 'true' : 'false'}
          onClick={handlerUp}
        >
          »
        </a>
      </li>
    </ul>
  );
};
