import { getVisibleItems } from '../../utils';

type Props = {
  items: string[],
  firstElementIndex: number,
  lastElementIndex: number,
};

export const ItemList: React.FC<Props> = ({
  items,
  firstElementIndex,
  lastElementIndex,
}) => (
  <ul>
    {getVisibleItems(items, firstElementIndex, lastElementIndex).map(item => (
      <li data-cy="item" key={item}>{item}</li>
    ))}
  </ul>
);
