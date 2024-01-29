import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countPages = Math.ceil(total / perPage); // рахуємо кількість сторінок
  const pageButtons = getNumbers(1, countPages); // створюємо масив з відповідною кількістю сторінок
  const changePage = (buttonNumber: number) => { // оптимізуємо зміну сторінки
    if (buttonNumber >= 1
      && buttonNumber <= pageButtons.length
      && buttonNumber !== currentPage) {
      onPageChange(buttonNumber);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pageButtons.map((buttonNumber) => (
        <li
          className={cn('page-item', { active: buttonNumber === currentPage })}
          key={buttonNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${buttonNumber}`}
            onClick={() => changePage(buttonNumber)}
          >
            {buttonNumber}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === countPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPages}
          onClick={() => changePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
