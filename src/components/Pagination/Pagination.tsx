import cn from 'classnames';

import { getNumbers } from '../../utils';

type Props = {
  currentPage: number,
  itemsToDisplay: Array<string>[],
  onPageChange: (page: number) => void,
};

export const Pagination = ({
  currentPage,
  itemsToDisplay,
  onPageChange,
}: Props) => {
  const qntyOfCells = getNumbers(1, itemsToDisplay.length);
  const leftArrowDisable = currentPage === 1;
  const rightArrowDisable = currentPage === itemsToDisplay.length;

  const handleCellClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const leftRightArrow = event.currentTarget.getAttribute('href');

    if (leftRightArrow === '#prev') {
      return onPageChange(currentPage - 1);
    }

    if (leftRightArrow === '#next') {
      return onPageChange(currentPage + 1);
    }

    const cellValue = +event.currentTarget.innerText;

    return cellValue !== currentPage && onPageChange(cellValue);
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn(
            'page-item',
            { disabled: leftArrowDisable },
          )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={leftArrowDisable}
            onClick={handleCellClick}
          >
            «
          </a>
        </li>
        {qntyOfCells.map(item => (
          <li
            key={item}
            className={cn(
              'page-item',
              { active: item === currentPage },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={handleCellClick}
            >
              {item}
            </a>
          </li>
        ))}
        <li
          className={cn(
            'page-item',
            { disabled: rightArrowDisable },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={rightArrowDisable}
            onClick={handleCellClick}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsToDisplay[currentPage - 1].map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
