import React, { useEffect } from 'react';
import { getPartItems } from '../../utils';

type Props = {
  items: string[];
  total: number;
  perPage: number;
  currentPage: number;
  setElements: React.Dispatch<React.SetStateAction<string[]>>;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  items,
  total,
  perPage,
  currentPage,
  setElements,
  onPageChange,
}) => {
  const amountOfButton = Math.ceil(total / Number(perPage));
  const buttons = [];

  const handlePageClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    pageNumber: number,
  ) => {
    event.preventDefault();
    onPageChange(pageNumber);
  };

  useEffect(() => {
    const updatedElements = getPartItems(items, currentPage, perPage);

    setElements(updatedElements);
  }, [currentPage, perPage, items, setElements]);

  const currentAmountOfItems = getPartItems(items, currentPage, perPage);

  const elements = currentAmountOfItems.map(item => (
    <li key={item} data-cy="item">
      {item}
    </li>
  ));

  for (let i = 1; i <= amountOfButton; i += 1) {
    buttons.push(
      <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
        <a
          onClick={event => handlePageClick(event, i)}
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : null}`}>
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
        {buttons}
        <li
          className={`page-item ${currentPage === amountOfButton ? 'disabled' : null}`}
        >
          <a
            onClick={() => {
              if (currentPage !== amountOfButton) {
                onPageChange(currentPage + 1);
              }
            }}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === amountOfButton ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
      <ul>{elements}</ul>
    </>
  );
};
