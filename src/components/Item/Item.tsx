import React from 'react';

type Props = {
  start: number;
  end: number;
};

export const Item: React.FC<Props> = ({ start, end }) => {
  const ite = Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, i) => start + i,
  );

  return (
    <ul>
      {ite.map(item => (
        <li key={item} data-cy="item">
          Item {item}
        </li>
      ))}
    </ul>
  );
};
