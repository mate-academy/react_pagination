import { FC } from 'react';
import { ItemListProps } from '../../types';

export const ItemList: FC<ItemListProps> = ({ items }) => (
  <ul>
    {
      items.map(item => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))
    }
  </ul>
);
