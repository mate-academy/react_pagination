import { FC } from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: string;
  page: string;
  onPageChange: (page: number) => void;
  onNextChange: () => void;
  onPrevChange: () => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  page,
  onPageChange,
  onNextChange,
  onPrevChange,
}) => {
  const currentAmountPages = Math.ceil(total / Number(perPage));
  const pages = Array.from(Array(currentAmountPages)
    .keys())
    .map(i => i + 1);

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
            onClick={() => onPageChange(item)}
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
