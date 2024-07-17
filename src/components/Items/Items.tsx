import { getNumbers } from '../../utils';

type Props = {
  frtItem: number;
  lastItem: number;
  total: number;
};

export const Items = ({ frtItem, lastItem, total }: Props) => {
  const items = (start: number, end: number) =>
    getNumbers(start, end).map(n => `Item ${n}`);
  const isLast = total > lastItem ? lastItem : total;

  const itemsArray = items(frtItem, isLast);

  return (
    <ul>
      {itemsArray.map(item => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))}
    </ul>
  );
};
