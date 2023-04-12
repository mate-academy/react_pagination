import React from 'react';

type Props = {
  itemsPerPage: string[];
};

export const ItemsList: React.FC<Props> = ({ itemsPerPage }) => {
  return (
    <ul>
      {itemsPerPage.map((item) => (
        <li
          data-cy="item"
          key={item}
        >
          {`${item}`}
        </li>
      ))}
    </ul>
  );
};
