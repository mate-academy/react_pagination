import React from 'react';

type Props = {
  item: string,
};

export const ItemInfo: React.FC<Props> = ({ item }) => {
  return (
    <li data-cy="item">
      {item}
    </li>
  );
};
