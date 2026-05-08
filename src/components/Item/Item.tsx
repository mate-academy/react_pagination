interface Props {
  item: string;
}

export const Item = ({ item }: Props) => (
  <li key={item} data-cy="item">
    {item}
  </li>
);
