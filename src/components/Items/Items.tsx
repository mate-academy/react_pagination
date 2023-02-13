type PropTypes = {
  items: string[];
};

export const Items: React.FC<PropTypes> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li data-cy="item" key={item}>{item}</li>
      ))}
    </ul>
  );
};
