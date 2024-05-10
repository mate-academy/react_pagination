import React from 'react';
import { OptionsProps } from '../types';

export const Options: React.FC<OptionsProps> = ({
  active,
  onChangePage,
  onChangeOption,
}) => {
  const arrayOfOptions = [3, 5, 10, 20];

  return (
    <select
      value={active}
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      onChange={elem => {
        onChangeOption(Number(elem.target.value));
        onChangePage(1);
      }}
    >
      {arrayOfOptions.map((elem: number) => (
        <option value={`${elem}`} key={elem}>
          {elem}
        </option>
      ))}
    </select>
  );
};
