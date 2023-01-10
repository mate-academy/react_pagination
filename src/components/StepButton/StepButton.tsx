import type { FC, MouseEvent } from 'react';
import cn from 'classnames';
import { Direction } from '../../types/Direction';

type Props = {
  direction: Direction;
  page: number;
  totalPage: number;
  handleClick: (e: MouseEvent) => void;
};

export const StepButton: FC<Props> = ({
  direction,
  page,
  totalPage,
  handleClick,
}) => (
  <>
    {direction === Direction.Prev && (
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
    )}

    {direction === Direction.Next && (
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
    )}
  </>
);
