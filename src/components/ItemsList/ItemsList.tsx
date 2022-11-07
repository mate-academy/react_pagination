import { Item } from '../../types/Item';

type Props = {
  items: Item[]
};

export const ItemsList: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map(({ title, id }) => (
        <li
          data-cy="item"
          key={id}
        >
          {title}
        </li>
      ))}
    </ul>
  );
};
