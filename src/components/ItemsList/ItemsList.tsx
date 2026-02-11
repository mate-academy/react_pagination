type PageProp = {
  items: string[];
  currentPage: number;
  perPage: number;
};

export const ItemsList = ({ items, currentPage, perPage }: PageProp) => {
  const startIndex = (currentPage - 1) * perPage;
  const pageItems = items.slice(startIndex, startIndex + perPage);

  return (
    <ul>
      {pageItems.map(item => (
        <li data-cy="item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
