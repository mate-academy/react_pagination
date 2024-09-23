import React from 'react';

type Props = {
  id: string;
  perPageOptions: number[];
  current: number;
  onChange: (val: number) => void;
};

export const PerPageSelector: React.FC<Props> = ({
  id,
  perPageOptions,
  current,
  onChange,
}) => {
  return (
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id={id}
        className="form-control"
        defaultValue={current}
        onChange={e => onChange(+e.target.value)}
      >
        {perPageOptions.map(val => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};
