import { FC, useMemo } from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  page: string;
  perPage: string;
  onNextChange: () => void;
  onPrevChange: () => void;
  onPageChange: (page: string) => void;
}

export const Pagination: FC<Props> = ({
  page,
  total,
  perPage,
  onPageChange,
  onNextChange,
  onPrevChange,
}) => {
  const currentAmountPages = useMemo(() => Math
    .ceil(total / Number(perPage)),
  [total, perPage]);

  const pages = useMemo(() => Array
    .from(Array(currentAmountPages).keys())
    .map(i => i + 1), [total, perPage]);

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: page === '1' },
      )}
      >
        <button
          type="button"
          data-cy="prevLink"
          className="page-link"
          aria-disabled={page === '1'}
          onClick={onPrevChange}
        >
          «
        </button>
      </li>
      {pages.map(item => (
        <li
          key={item}
          className={classNames('page-item', {
            active: +page === item,
          })}
        >
          <button
            type="button"
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(`${item}`)}
          >
            {item}
          </button>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        { disabled: +page === pages.length },
      )}
      >
        <button
          type="button"
          data-cy="nextLink"
          className="page-link"
          aria-disabled={page ? +page === pages.length : false}
          onClick={onNextChange}
        >
          »
        </button>
      </li>
    </ul>
  );
};
