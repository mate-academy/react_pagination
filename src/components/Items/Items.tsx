import React from 'react';

type Props = {
  visibleItems: Array<string>
};

export const Items: React.FC<Props> = React.memo(({
  visibleItems,
}) => (
  <ul>
    {visibleItems.map(item => (
      <li data-cy="item" key={item}>{item}</li>
    ))}
  </ul>
));
