import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (button:number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttonsAmount = Math.ceil(total / perPage);
  const buttonsPerPage = getNumbers(1, buttonsAmount);

  const prevLinkCheck = (prevLink: number) => {
    if (prevLink + 1 !== 1) {
      onPageChange(prevLink);
    }
  };

  const linkCheck = (button: number) => {
    if (button !== currentPage) {
      onPageChange(button);
    }
  };

  const nextLinkCheck = (nextLink: number) => {
    if (nextLink - 1 !== buttonsAmount) {
      onPageChange(nextLink);
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
          onClick={() => prevLinkCheck(currentPage - 1)}
        >
          «
        </a>
      </li>

      {buttonsPerPage.map(button => (
        <li
          key={button}
          className={cn('page-item', { active: currentPage === button })}
        >
          <a
            onClick={() => linkCheck(button)}
            data-cy="pageLink"
            className="page-link"
            href={`#${button}`}
          >
            {button}
          </a>
        </li>
      ))}

      <li className={cn('page-item',
        { disabled: currentPage === buttonsAmount })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === buttonsAmount}
          onClick={() => nextLinkCheck(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
