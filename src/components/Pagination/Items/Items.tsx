type Props = {
  currentList: string[],
};

export const Items: React.FC<Props> = ({ currentList }) => {
  return (
    <ul>
      {currentList.map(item => {
        return <li data-cy="item" key={item}>{item}</li>;
      })}
    </ul>
  );
};
