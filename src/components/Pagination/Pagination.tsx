import React from 'react';

type Props = {
  items: string[],
  perPageSelector: number,
  selected: number,
  setSelected: React.Dispatch<React.SetStateAction<number>>
};

export const Pagination: React.FC<Props> = ({
  items,
  perPageSelector,
  selected,
  setSelected,
}) => {
  const numberPages = Math.ceil(items.length / +perPageSelector);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${selected === 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={() => {
              if (selected === 1) {
                return;
              }

              setSelected(prev => prev - 1);
            }}
          >
            «
          </a>
        </li>
        {items.filter((_, index) => index < numberPages)
          .map((item, index) => (
            <li
              className={`page-item ${selected === index + 1 && 'active'}`}
              key={item}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`${index + 1}`}
                onClick={() => {
                  setSelected(index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}
        <li className={`page-item ${selected === numberPages && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={() => {
              if (selected === numberPages) {
                return;
              }

              setSelected(prev => prev + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
