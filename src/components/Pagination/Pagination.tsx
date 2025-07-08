import React, { useEffect, useState } from 'react';

type Props = {
  value: number;
  items: string[];
  handleChangeP: (currentPage: number) => void;
  changeLead: (currentPageInf: number) => void;
};

export const Pagination: React.FC<Props> = ({
  value,
  items,
  handleChangeP,
  changeLead,
}) => {
  const [pageCount, setPageCount] = useState<number>(9);
  const [isActive, setIsActive] = useState<number>(0);
  const [preparedItems, setPreparedItems] = useState<string[][]>([]);

  const detectPageCount = (pages: number) => {
    return Math.ceil(42 / pages);
  };

  const prepareItems = (mapOfItems: string[]) => {
    const newMapOfItems = [...mapOfItems];
    const prepItems: string[][] = [];

    for (let i = 0; i < pageCount; i++) {
      if (i + 1 === pageCount) {
        changeLead(items.length);
      }

      changeLead(0);
      prepItems.push(newMapOfItems.splice(0, value));
    }

    return prepItems;
  };

  useEffect(() => {
    setPageCount(detectPageCount(value));
    setPreparedItems(prepareItems(items));
    setIsActive(0);
  }, [value, items]);

  useEffect(() => {
    handleChangeP(isActive + 1);
  }, [isActive, handleChangeP]);

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${isActive === 0 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            aria-disabled={`${isActive === 0 ? 'true' : 'false'}`}
            href={`${isActive === 0 ? '#1' : '#prev'}`}
            onClick={() => {
              if (isActive > 0) {
                setIsActive(isActive - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {Array.from({ length: pageCount }, (_, i) => (
          <li
            key={i}
            className={`page-item ${isActive === i ? 'active' : ''}`}
            onClick={() => setIsActive(i)}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${isActive + 1}`}
            >
              {i + 1}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${isActive === pageCount - 1 ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href={`${isActive === pageCount - 1 ? `#${pageCount}` : '#next'}`}
            aria-disabled={`${isActive === pageCount - 1 ? 'true' : 'false'}`}
            onClick={() => {
              if (isActive < pageCount - 1) {
                setIsActive(isActive + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      {preparedItems[isActive] ? (
        <ul>
          {preparedItems[isActive].map((el, index) => (
            <li key={index} data-cy="item">
              {el}
            </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
};
