type ResultListProps = {
  visibleList: number[];
};

export const ResultList: React.FC<ResultListProps> = ({ visibleList }) => {
  return (
    <ul>
      {visibleList.map(item => (
        <li data-cy="item" key={item}>
          Item {item}
        </li>
      ))}
    </ul>
  );
};
