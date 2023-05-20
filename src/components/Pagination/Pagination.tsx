import React from 'react';
/* eslint-disable */
interface Props {
  total: string[],
  perPage: string,
  countPage: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void,
  onDeac: () => void,
  onInc: () => void
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  countPage,
  currentPage,
  onPageChange,
  onDeac,
  onInc
}) => {
  console.log(onDeac);

  return (
    <>
      <ul className="pagination">
        <li className="page-item">
          <button
            type="button"
            data-cy="prevLink"
            className="page-link"
            aria-disabled="true"
            onClick={onDeac}
          >
            «
          </button>
          
        </li>
        {Array(countPage).fill('page').map((page, index) => (
          <li
            key={page + index}
            className={`page-item ${currentPage === index && 'active'}`}
          >
            <button
              type="button"
              data-cy="pageLink"
              className="page-link"
              onClick={() => onPageChange(index)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            type='button'
            data-cy="nextLink"
            className="page-link"
            aria-disabled="false"
            onClick={onInc}
          >
            »
          </button>
        </li>
      </ul>
      <ul>
        {total.slice((Number(perPage) * currentPage), (Number(perPage) * (currentPage + 1))).map((item: string) => (
          <li key={item} data-cy={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
