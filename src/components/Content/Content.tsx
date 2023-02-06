import React from 'react';

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

type Props = {
  items: string[];
};
export const Content: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li
          key={getRandomDigits()}
          data-cy="item"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
