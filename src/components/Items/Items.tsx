type Props = {
  preparedItems: string [];
};

export const Items: React.FC<Props> = ({ preparedItems }) => {
  return (
    <ul>
      {preparedItems.map(item => (
        <li data-cy="item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
