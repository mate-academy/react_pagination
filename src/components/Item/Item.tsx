import type { FC } from 'react';

type Props = {
  item: string;
};

export const Item: FC<Props> = ({ item }) => (
  <li data-cy="item">{item}</li>
);
