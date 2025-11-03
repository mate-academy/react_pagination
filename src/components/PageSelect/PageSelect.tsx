import React from 'react';

interface Props {
  perPage: number;
  onPerPageChange: (perPage: number) => void;
}

export const PageSelect: React.FC<Props> = ({ perPage, onPerPageChange }) => {
  const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange(+e.target.value);
  };

  return (
    <select
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      value={perPage}
      onChange={handleChangePerPage}
    >
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  );
};
