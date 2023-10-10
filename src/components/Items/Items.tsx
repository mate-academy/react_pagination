import React from 'react';

type Props = {
  preparedItems: string[];
};

export const Items: React.FC<Props> = ({ preparedItems }) => {
  return (
    <ul>
      {preparedItems.map(item => (
        <li key={item} data-cy="item">
          {item}
        </li>
      ))}
    </ul>
  );
};
