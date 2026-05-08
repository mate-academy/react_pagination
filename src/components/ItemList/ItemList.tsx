import { Item } from '../Item';

interface Props {
  items: string[];
}

export const ItemList = ({ items }: Props) => (
  <ul>
    {items.map(item => (
      <Item key={item} item={item} />
    ))}
  </ul>
);
