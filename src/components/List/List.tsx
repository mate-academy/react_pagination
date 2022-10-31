import { FC } from 'react';

interface Props {
  items: Item[];
}

export const List: FC<Props> = ({ items }) => (
  <ul>
    {items.map(({ title, id }) => (
      <li key={id} data-cy="item">{title}</li>
    ))}
  </ul>
);
