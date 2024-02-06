import React from 'react';
import cn from 'classnames';

interface Props {
  currentPage: number,
  pagesToShow:number[],
  onPageChange: React.Dispatch<number>,
}

export const Pagination:React.FC<Props> = ({
  currentPage,
  pagesToShow,
  onPageChange,
}) => {
  const arrowLeftDisable = currentPage === pagesToShow[0];
  const arrowRightDisable = currentPage === pagesToShow[pagesToShow.length - 1];
  const handleClickLeft = () => {
    onPageChange(currentPage - 1);
  };

  const handleClickRight = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: arrowLeftDisable,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={arrowLeftDisable ? 'true' : 'false'}
          onClick={handleClickLeft}
        >
          «
        </a>
      </li>
      {pagesToShow.map((page) => (
        <li
          className={cn('page-item', {
            active: currentPage === page,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: arrowRightDisable,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            arrowRightDisable ? 'true' : 'false'
          }
          onClick={handleClickRight}
        >
          »
        </a>
      </li>
    </ul>
  );
};
