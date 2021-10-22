import React from 'react';

type Props = {
  perPage: number,
  firstItemOnPage: number,
  selectValues: number[],
  onPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>, firstItemOnPage: number) => void,
};

export const SelectPerPage: React.FC<Props> = ({
  perPage,
  firstItemOnPage,
  selectValues,
  onPerPageChange,
}) => {
  return (
    <label htmlFor="selectPerPage">
      Select items per page:
      {' '}
      <select
        value={perPage}
        id="selectPerPage"
        onChange={(event) => {
          onPerPageChange(event, firstItemOnPage);
        }}
      >
        {selectValues.map(value => (
          <option key={`option-${value}`} value={value}>{value}</option>
        ))}
      </select>
    </label>
  );
};
