import React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  total: number;
  page: number;
  setPage: (e: React.MouseEvent) => void
  next: () => void;
  prev: () => void;
};

export const Pagination: React.FC<Props> = React.memo(({
  total,
  page,
  setPage,
  next,
  prev,
}) => {
  const pageList = Array(total).fill(null).map((_, i) => i + 1);

  const visiblePages = (num: number) => {
    const lastItem = pageList[pageList.length - 1];

    switch (true) {
      case num <= 3:
        return [...pageList.slice(0, num + 1), '...', lastItem];
      case num >= total - 2:
        return [pageList[0], '...',
          ...pageList.slice(pageList.indexOf(num - 1))];
      default:
        return [pageList[0], '...',
          ...pageList.slice(num - 2, num + 1), '...', lastItem];
    }
  };

  const createButton = (
    text: string,
    callback: () => void,
    condition: boolean,
  ) => (
    <button
      className="button list__button"
      type="button"
      onClick={callback}
      disabled={condition}
    >
      {text}
    </button>
  );

  return (
    <nav className="Pagination">
      <ul className="list Pagination__list">
        {createButton('prev', prev, page <= 1)}
        {visiblePages(page).map(item => (
          <li
            className="item list__item"
            key={item === '...' ? Math.random() : item.toString()}
          >
            <button
              type="button"
              className={classNames(
                'button',
                'item__button',
                { 'item__button--choosen': item === page },
              )}
              onClick={setPage}
            >
              {item}
            </button>
          </li>
        ))}
        {createButton('next', next, page >= total)}
      </ul>
      <h2 className="Pagination__info">
        {`${page} of ${total}`}
      </h2>
    </nav>
  );
});
