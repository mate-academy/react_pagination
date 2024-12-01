import React from 'react';

const ITEMS_PER_PAGE = [3, 5, 10, 20];

interface SelectProp {
  perPage: number;
  onPerPageChenge: (value: number) => void;
}

export const Select: React.FC<SelectProp> = ({ perPage, onPerPageChenge }) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          value={perPage}
          onChange={event => {
            onPerPageChenge(+event.currentTarget.value);
          }}
        >
          {ITEMS_PER_PAGE.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <label htmlFor="perPageSelector" className="col-form-label col">
        items per page
      </label>
    </div>
  );
};
