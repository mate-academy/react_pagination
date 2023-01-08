import type { FC } from 'react';
import { Item } from '../Item/Item';

type Props = {
  items: string[];
  currentPage: number;
  perPage: number;
};

export const ItemList: FC<Props> = ({
  items,
  currentPage,
  perPage,
}) => (
  <ul>
    {items.map((item, index) => {
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;

      if (index >= start && index < end) {
        return <Item key={item} item={item} />;
      }

      return null;
    })}

  </ul>
);
