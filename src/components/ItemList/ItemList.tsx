import React from 'react';
import { ItemInfo } from '../ItemInfo';

type Props = {
  items: string[],
};

export const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <ItemInfo key={item} item={item} />
      ))}
    </ul>
  );
};
