interface Props {
  name: string;
}

export const Item: React.FC<Props> = ({ name }) => {
  return <li data-cy="item">{name}</li>;
};
