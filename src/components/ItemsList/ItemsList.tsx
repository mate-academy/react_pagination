type Props = {
  itemList: number[]
};

export const ItemsList: React.FC<Props> = ({ itemList }) => {
  return (
    <ul>
      {itemList.map(item => (
        <li data-cy="item">{`Item ${item}`}</li>
      ))}
    </ul>
  );
};
