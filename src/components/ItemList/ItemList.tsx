import React from 'react';
import { Item } from '../Item/Item';

type Props = {
  list: string[];
};

export const ItemList: React.FC<Props> = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item} item={item} />
      ))}
    </ul>
  );
};
