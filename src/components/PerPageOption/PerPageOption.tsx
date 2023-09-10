import React from 'react';

type Props = {
  option: number,
};

export const PerPageOption: React.FC<Props> = ({ option }) => {
  return (
    <option value={option}>{option}</option>
  );
};
