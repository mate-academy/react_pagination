interface Props {
  items: number[];
  total: number;
}

export const ItemsList = ({ items, total }: Props) => {
  return (
    <ul>
      {items.map(item => {
        const visibleItem = item + 1;

        {
          if (item < total) {
            return (
              <li key={item} data-cy="item">
                {`Item ${visibleItem}`}
              </li>
            );
          }

          return null;
        }
      })}
    </ul>
  );
};
