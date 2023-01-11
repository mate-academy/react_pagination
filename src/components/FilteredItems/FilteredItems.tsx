import React from 'react';

interface Props {
  perPage: number,
  currentPage: number;
  total: number;
}

export const FilteredItems : React.FC<Props> = ({
  perPage,
  currentPage,
  total,
}) => {
  return (
    <ul>
      {Array.from(
        { length: perPage },
        (_, i) => i,
      )
        .sort((a, b) => b - a)
        .map(item => {
          const maxValue = perPage * currentPage;

          if (maxValue - item > total) {
            return null;
          }

          return (
            <li
              key={item}
              data-cy="item"
            >
              {`Item ${maxValue - item}`}
            </li>
          );
        })}
    </ul>
  );
};
