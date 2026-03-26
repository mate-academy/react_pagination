import React from 'react';

interface SelectorProps {
  options: number[];
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Selector = ({ options, value, onChange }: SelectorProps) => {
  return (
    <select
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
