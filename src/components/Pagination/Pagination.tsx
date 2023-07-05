import React from 'react';
import classNames from 'classnames';
import { getPeriod } from '../../helpers/getPeriod';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = React.memo(({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countOfButtons = Math.ceil(total / perPage);

  const firstPageIsActive = currentPage === 1;
  const lastPageIsActive = currentPage === countOfButtons;

  const PageSwitcher = () => {
    const switchers = [];

    for (let i = 1; i <= countOfButtons; i += 1) {
      const onClickHandler = () => onPageChange(i);

      switchers.push(
        <li
          key={`Switcher key: ${i}`}
          className={classNames(
            'page-item',
            { active: i === currentPage },
          )}
        >
          <button
            type="button"
            data-cy="pageLink"
            onClick={onClickHandler}
            className="page-link"
          >
            {i}
          </button>
        </li>,
      );
    }

    return <>{switchers}</>;
  };

  const Items = () => {
    const items = [];

    const [from, to] = getPeriod(
      currentPage,
      perPage,
      total,
    );

    for (let i = from; i <= to; i += 1) {
      items.push(
        <li
          data-cy="item"
          key={`Item key: ${i}`}
        >
          {`Item ${i}`}
        </li>,
      );
    }

    return (
      <ul>
        {items}
      </ul>
    );
  };

  const onPrevHandler = () => {
    if (!firstPageIsActive) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextHandler = () => {
    if (!lastPageIsActive) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: firstPageIsActive })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={firstPageIsActive}
            onClick={onPrevHandler}

          >
            «
          </a>
        </li>

        <PageSwitcher />

        <li
          className={classNames('page-item', { disabled: lastPageIsActive })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={lastPageIsActive}
            onClick={onNextHandler}
          >
            »
          </a>
        </li>
      </ul>

      <Items />
    </>
  );
});
