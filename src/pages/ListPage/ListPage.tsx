import React from 'react';
import { ItemsList } from '../../components/ItemsList/ItemsList';

type Props = {
  items: string[],
};

export const ListPage: React.FC<Props> = ({ items }) => {
  return (
    <ItemsList
      items={items}
    />
  );
};
