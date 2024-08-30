import React, { useEffect, useMemo } from 'react';
import { getPartItems } from '../../utils';

type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
  setElements: React.Dispatch<React.SetStateAction<string[]>>;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  elements: string[];
};

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  setElements,
  onPageChange,
  elements,
}) => {
  const pages = Math.ceil(total / Number(perPage));

  useEffect(() => {
    const updatedElements = getPartItems(items, currentPage, perPage);

    setElements(updatedElements);
  }, [currentPage, perPage, items, setElements]);

  const selectedElements = elements.map(item => (
    <li key={item} data-cy="item">
      {item}
    </li>
  ));

  const visibleButtons = useMemo(() => {
    const handlePageClick = (pageNumber: number) => {
      onPageChange(pageNumber);
    };

    const buttons = [];

    for (let i = 1; i <= pages; i += 1) {
      buttons.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
        >
          <a
            onClick={() => handlePageClick(i)}
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
          >
            {i}
          </a>
        </li>,
      );
    }

    return buttons;
  }, [onPageChange, pages, currentPage]);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {visibleButtons}
        <li className={`page-item ${currentPage === pages && 'disabled'}`}>
          <a
            onClick={() => {
              if (currentPage !== pages) {
                onPageChange(currentPage + 1);
              }
            }}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
      <ul>{selectedElements}</ul>
    </>
  );
};
