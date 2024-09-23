import React from 'react';
import { ItemList } from '../ItemList';

type Props = { items: string[] };

export const Page: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      <ItemList items={items} />
    </ul>
  );
};
