import React from 'react';

type Props = {
  numbers: string[];
};

export const NumberList: React.FC<Props> = ({ numbers }) => {
  return (
    <ul>
      {numbers.map(num => (
        <li key={num}>{num}</li>
      ))}
    </ul>
  );
};
