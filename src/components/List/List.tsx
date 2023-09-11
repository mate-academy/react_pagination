interface Item {
  name: string,
  id: number,
}

type Props = {
  items: Item[],
  perPage: number,
  currentPage: number,
};

export const List: React.FC<Props> = ({
  items,
  perPage,
  currentPage,
}) => {
  return (
    <ul>
      {items.slice((currentPage - 1) * perPage, currentPage * perPage)
        .map(item => (
          <li data-cy="item" key={item.id}>{item.name}</li>
        ))}
    </ul>
  );
};
