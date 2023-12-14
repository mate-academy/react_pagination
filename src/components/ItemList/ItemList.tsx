import { FC } from 'react';
import { ItemListProps } from '../../types';

export const ItemList: FC<ItemListProps> = ({
  items, firstIndex, lastIndex,
}) => (
  <ul>
    {
      items.slice(firstIndex, lastIndex).map(item => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))
    }
  </ul>
);
