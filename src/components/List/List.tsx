// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

type Types = {
  items: string[];
};

export const List: React.FC<Types> = ({ items }) => {
  const [query] = useSearchParams();
  const currentPage = parseInt(query.get('page') as string);
  const perPage = parseInt(query.get('perPage') as string);

  const itemsFiltered = items.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage,
  );

  return (
    <ul>
      {itemsFiltered.map(item => {
        return (
          <li key={`listItem: ${item}`} data-cy="item">
            {item}
          </li>
        );
      })}
    </ul>
  );
};
