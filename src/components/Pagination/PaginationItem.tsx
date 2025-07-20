import React from 'react';

type Props = {
  item: number;
};

export const PaginationItem: React.FC<Props> = ({ item }) => {
  return <li data-cy="item">Item {item}</li>;
};
