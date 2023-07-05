import cn from 'classnames';

type Props = {
  total: Array<string>[],
  qntyOfCells: number[]
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination = ({
  currentPage,
  qntyOfCells,
  total,
  onPageChange,
}: Props) => {
  const leftArrowDisable = currentPage === 1;
  const rightArrowDisable = currentPage === total.length;

  const handleLeftArrow = () => {
    return currentPage > 1
      ? onPageChange(currentPage - 1)
      : null;
  };

  const handleRightArrow = () => {
    return currentPage < total.length
      ? onPageChange(currentPage + 1)
      : null;
  };

  const handleCellClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const cellValue = +event.currentTarget.innerText;

    return cellValue !== currentPage
      ? onPageChange(cellValue)
      : null;
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
            onClick={handleLeftArrow}
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
            onClick={handleRightArrow}
          >
            »
          </a>
        </li>
      </ul>
      {total[currentPage - 1] !== undefined && (
        <ul>
          {total[currentPage - 1].map(item => (
            <li
              data-cy="item"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
