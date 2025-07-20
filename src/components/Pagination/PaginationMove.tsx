import React from 'react';
import classNames from 'classnames';

type Props = {
  item: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationMove: React.FC<Props> = ({
  item,
  currentPage,
  onPageChange,
}) => {
  return (
    <li className={classNames('page-item', { active: currentPage === item })}>
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${item}`}
        onClick={() => onPageChange(item)}
      >
        {item}
      </a>
    </li>
  );
};
