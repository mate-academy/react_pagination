import React from 'react';

type Props = {
  item: string;
};

export const Item: React.FC<Props> = ({ item }) => {
  return (
    <li data-cy="item" key={item}>
      {item}
    </li>
  );
};
