import { FC } from 'react';

type ItemListProps = {
  items: string[],
  firstIndex: number,
  lastIndex: number,
};

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
