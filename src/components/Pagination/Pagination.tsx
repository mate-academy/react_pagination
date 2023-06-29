import React from 'react';
import classNames from 'classnames';

import { getNumbers } from '../../utils';

type Props = {
  total: number,
  PerPage: number,
  currentPage: number,
  onPageChange: (value: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  PerPage,
  currentPage,
  onPageChange,
}) => {
  const paginateItemsCount = Math.ceil(total / PerPage);
  const paginateItemsArray = getNumbers(1, paginateItemsCount);
  const makeOnPageChange = (page: number) => () => onPageChange(page);

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={makeOnPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {paginateItemsArray.map((item: number) => (
        <li
          className={classNames(
            'page-item',
            { active: currentPage === item },
          )}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={makeOnPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === paginateItemsCount,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === paginateItemsCount ? 'true' : 'false'}
          onClick={makeOnPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
