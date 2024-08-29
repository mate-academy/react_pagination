import React from 'react';

type Props = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const DropDown: React.FC<Props> = ({ value, setValue, setPage }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setValue(Number(event.target.value));
    setPage(1);
  };

  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          value={value}
          onChange={handleSelectChange}
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
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
