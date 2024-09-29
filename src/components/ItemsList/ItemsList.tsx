import { Item } from '../Item/Item';

interface Props {
  items: string[];
}

export const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <Item name={item} key={index} />
      ))}
    </ul>
  );
};
