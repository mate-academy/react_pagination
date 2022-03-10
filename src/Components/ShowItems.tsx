interface Item {
  name: string,
}

type Props = {
  total: Item[],
  perPage: number,
  firstItemIndex: number,
};

export const ShowItems: React.FC<Props> = ({ total, perPage, firstItemIndex }) => {
  const segment = [...total].splice(firstItemIndex, perPage);

  return (
    <div className="items__container">
      {segment.map(item => (
        <div className="items__item">{item.name}</div>
      ))}
    </div>
  );
};
