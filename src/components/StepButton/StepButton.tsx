import type { FC, MouseEvent } from 'react';
import cn from 'classnames';

type Props = {
  direction: 'next' | 'prev';
  page: number;
  totalPage: number;
  handleClick: (e: MouseEvent) => void;
};

export const StepButton: FC<Props> = ({
  direction,
  page,
  totalPage,
  handleClick,
}) => {
  if (direction === 'prev') {
    return (
      <li
        className={cn('page-item', {
          disabled: page === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={page === 1}
          onClick={(e) => handleClick(e)}
        >
          «
        </a>
      </li>
    );
  }

  return (
    <li
      className={cn('page-item', {
        disabled: page === totalPage,
      })}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled={page === totalPage}
        onClick={(e) => handleClick(e)}
      >
        »
      </a>
    </li>
  );
};
