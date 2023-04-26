import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;
  const amountOfTabs = Math.ceil(total / perPage);
  const tabs = getNumbers(1, amountOfTabs);

  const handlePageChange = (tab: number) => {
    onPageChange(tab);
  };

  const handleLeftCLick = () => {
    onPageChange(currentPage - 1);
  };

  const handleRightClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li className={classNames({
        'page-item': true,
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={(currentPage === 1)}
          onClick={handleLeftCLick}
        >
          «
        </a>
      </li>
      {tabs.map(tab => (
        <li
          className={classNames({
            'page-item': true,
            active: currentPage === tab,
          })}
          key={tab}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${tab}`}
            onClick={() => handlePageChange(tab)}
          >
            {tab}
          </a>
        </li>
      ))}
      <li className={classNames({
        'page-item': true,
        disabled: currentPage === amountOfTabs,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountOfTabs}
          onClick={handleRightClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
