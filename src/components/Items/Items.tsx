import { FC } from 'react';

interface Props {
  items: string[];
}

export const Items: FC<Props> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item} data-cy="item">
        {item}
      </li>
    ))}
  </ul>
);
