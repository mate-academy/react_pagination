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

      {itemsLengthArray.map((item, index) => (
        <li
          key={item}
          className={`${(currentPage - 1) === index ? 'active' : ''} page-item`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={() => onPageLinkClick(index + 1)}
          >
            {index}
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
