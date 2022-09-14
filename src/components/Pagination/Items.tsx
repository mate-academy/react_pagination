type Props = {
  items: string[]
  loading: boolean
};

export const Items: React.FC<Props> = ({ items, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <ul>
      {items.map(item => (
        <li
          key={item}
          data-cy="item"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
