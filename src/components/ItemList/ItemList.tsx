import React from 'react';
interface VisiblevisibleItems {
  visibleItems: string[];
}
export const ItemList: React.FC<VisiblevisibleItems> = ({ visibleItems }) => {
  return (
    <ul>
      {visibleItems.map(item => (
        <li data-cy="item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
