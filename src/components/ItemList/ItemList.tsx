type Props = {
  visibleItems: string[];
};

export const ItemList: React.FC<Props> = ({ visibleItems }) => {
  return (
    <ul>
      {visibleItems.map(item => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))}
    </ul>
  );
};
