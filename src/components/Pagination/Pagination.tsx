import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  onSwitchPage: (val: string) => void,
  newItems: string[],
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onSwitchPage,
  newItems,
}) => {
  const lists = Math.ceil(total / perPage);
  const quantityPages = [...Array(lists)].map((_e, i) => i + 1);

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item',
          { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled="true"
            onClick={() => onSwitchPage('prevLink')}
          >
            «
          </a>
        </li>
        {quantityPages.map(page => (
          <li
            key={page}
            className={classNames('page-item',
              { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={classNames('page-item',
          { disabled: currentPage === lists })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled="false"
            onClick={() => onSwitchPage('nextLink')}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {newItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
