import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const itemsLengthArray = new Array(Math.ceil(total / perPage)).fill('item');
  const onPageLinkClick = (value: number, condition = true) => {
    return condition && onPageChange(value);
  };

  return (
    <ul className="pagination">
      <li className={`${currentPage === 1 ? 'disabled ' : ''}page-item`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={
            () => onPageLinkClick(currentPage - 1, currentPage !== 1)
          }
        >
          «
        </a>
      </li>

      {itemsLengthArray.map((_, i) => (
        <li
          className={`${(currentPage - 1) === i ? 'active' : ''} page-item`}
          key={Math.floor((1 + Math.random()) * 0x10000)}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i + 1}`}
            onClick={() => onPageLinkClick(i + 1)}
          >
            {i + 1}
          </a>
        </li>
      ))}

      <li className={`${currentPage === itemsLengthArray.length ? 'disabled ' : ''}page-item`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === itemsLengthArray.length}
          onClick={() => onPageLinkClick(
            currentPage + 1,
            currentPage !== itemsLengthArray.length,
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
