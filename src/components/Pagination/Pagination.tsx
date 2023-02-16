import React from 'react';
import classNames from 'classnames';

type Props = {
  items: string[],
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
  from: number,
  to:number,
};

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  onPageChange,
  from,
  to,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pageItems = [];

  const onClickHandle = (item: number) => {
    onPageChange(item);
  };

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= pagesCount; i++) {
    pageItems.push(i);
  }

  const renderItem = items.slice(from - 1, to);

  const onButtonPrev = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onButtonNext = () => {
    if (currentPage !== pageItems.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={onButtonPrev}
          >
            «
          </a>
        </li>

        {pageItems.map((item) => {
          return (
            <li
              className={classNames(
                'page-item',
                { active: currentPage === item },
              )}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${item}`}
                onClick={() => onClickHandle(item)}
              >
                {item}
              </a>
            </li>
          );
        })}

        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === pageItems.length },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageItems.length}
            onClick={onButtonNext}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {renderItem.map((item) => {
          return <li data-cy="item">{item}</li>;
        })}
      </ul>
    </>
  );
};
