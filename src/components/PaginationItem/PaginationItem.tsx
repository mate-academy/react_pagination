import { FC } from 'react';
import cn from 'classnames';

interface Props {
  page: number;
  currentPage: number;
  handleOnClick: (page: number) => void;
}

export const PaginationItem: FC<Props> = ({
  page,
  currentPage,
  handleOnClick,
}) => {
  return (
    <li
      className={cn('page-item', {
        active: page === currentPage,
      })}
    >
      <a
        data-cy="pageLink"
        className="page-link"
        href={`#${page}`}
        aria-disabled={currentPage === page}
        onClick={() => handleOnClick(page)}
      >
        {page}
      </a>
    </li>
  );
};
