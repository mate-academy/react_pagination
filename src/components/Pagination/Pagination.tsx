import classNames from 'classnames';
import { FC } from 'react';
import { ItemsPerPage } from '../../types';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: ItemsPerPage,
  currentPage: number,
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const buttonsCount = Math.ceil(total / +perPage);
  const labels = getNumbers(1, buttonsCount);
  const prevButtonDisabled = currentPage === 1;
  const nextButtonDisabled = currentPage === buttonsCount;

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: prevButtonDisabled,
        },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevButtonDisabled}
          onClick={() => {
            if (!prevButtonDisabled) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {labels.map(number => (
        <li
          key={number}
          className={classNames(
            'page-item',
            {
              active: number === currentPage,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => {
              onPageChange(number);
            }}
          >
            {number}
          </a>
        </li>
      ))}

      <li className={classNames(
        'page-item',
        {
          disabled: nextButtonDisabled,
        },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextButtonDisabled}
          onClick={() => {
            if (!nextButtonDisabled) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
