interface Props {
  currentItemsToRender: string[]
}

const ItemList: React.FC<Props> = ({
  currentItemsToRender,
}) => {
  return (
    <div>
      <ul>
        {currentItemsToRender.map((item: string) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ItemList;
