import cn from 'classnames';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const tabsCount = Math.ceil(total / perPage);
  const tabs = getNumbers(1, tabsCount).map(number => ({
    number,
    id: uuidv4(),
  }));

  const getNextPage = () => {
    if (currentPage !== tabsCount) {
      onPageChange(currentPage + 1);
    }
  };

  const getPrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}

      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={getPrevPage}
        >
          «
        </a>
      </li>

      {tabs.map(tab => (
        <li
          className={cn(
            'page-item',
            { active: currentPage === tab.number },
          )}
          key={tab.id}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${tab.number}`}
            onClick={() => onPageChange(tab.number)}
          >
            {tab.number}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item',
        { disabled: currentPage === tabsCount },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === tabsCount}
          onClick={getNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
