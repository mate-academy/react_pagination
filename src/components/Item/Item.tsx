type Props = {
  item: string;
};

export const Item: React.FC<Props> = ({ item }) => (
  <li data-cy="item">{item}</li>
);
