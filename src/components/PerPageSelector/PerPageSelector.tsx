import React from 'react';

interface Props {
  options: number[];
  current: number;
  onChange: (page: number) => void;
}

export const PerPageSelector: React.FC<Props> = ({
  options,
  current,
  onChange,
}) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          onChange={e => onChange(+e.target.value)}
        >
          {options.map(option => (
            <option value={option} selected={option === current} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor="perPageSelector" className="col-form-label col">
        items per page
      </label>
    </div>
  );
};
