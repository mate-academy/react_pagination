import { getNumbers } from '../../utils';

type Props = {
  itemFrom: number;
  itemTo: number;
};

export const ItemList: React.FC<Props> = ({ itemFrom, itemTo }) => {
  const items = getNumbers(itemFrom, itemTo);

  return (
    <ul>
      {items.map(n => (
        <li key={n} data-cy="item">
          Item {n}
        </li>
      ))}
    </ul>
  );
};
