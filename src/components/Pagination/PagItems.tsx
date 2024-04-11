type Props = {
  items: string[];
};

export const PaginationItems: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map((item: string, index: number) => (
        <li key={index} data-cy="item">
          {item}
        </li>
      ))}
    </ul>
  );
};
