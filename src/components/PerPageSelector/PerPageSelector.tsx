import React from 'react';

interface Props {
  perPage: number;
  onPerPageChange: (perPageValue: number) => void;
}

export const PerPageSelector: React.FC<Props>
= ({ perPage, onPerPageChange }) => {
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = parseInt(event.target.value, 10);

    onPerPageChange(perPageValue);
  };

  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          onChange={handlePerPageChange}
          value={perPage}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <label htmlFor="perPageSelector" className="col-form-label col">
        items per page
      </label>
    </div>
  );
};
