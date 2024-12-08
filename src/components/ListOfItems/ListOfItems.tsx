import { v4 as uuidv4 } from 'uuid';

interface Props {
  currentItems: string[];
}

export const ListOfItems: React.FC<Props> = props => {
  const { currentItems } = props;

  return (
    <ul>
      {currentItems.map(item => {
        return (
          <li key={uuidv4()} data-cy="item">
            {item}
          </li>
        );
      })}
    </ul>
  );
};
