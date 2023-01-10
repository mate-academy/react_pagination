import type { FC } from 'react';
import cn from 'classnames';

type Props = {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PageNumber: FC<Props> = ({
  page,
  currentPage,
  onPageChange,
}) => (
  <li
    className={cn('page-item', {
      active: page === currentPage,
    })}
  >
    <a
      data-cy="pageLink"
      className="page-link"
      href={`#${page}`}
      onClick={(e) => {
        e.preventDefault();
        onPageChange(page);
      }}
    >
      {page}
    </a>
  </li>
);
