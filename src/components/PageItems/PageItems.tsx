import { FC } from 'react';

type Props = {
  currentPageItems: string[];
};

export const PageItems: FC<Props> = ({ currentPageItems }) => (
  <ul>
    {currentPageItems.map(item => (
      <li data-cy="item" key={item}>{item}</li>
    ))}
  </ul>
);
