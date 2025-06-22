export const PageItems = ({ itemsList }: { itemsList: string[] }) => (
  <ul>
    {itemsList.map(item => (
      <li data-cy="item" key={item}>
        {item}
      </li>
    ))}
  </ul>
);
