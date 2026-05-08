interface Props {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

export const PerPageSelector = ({ value, options, onChange }: Props) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          value={value}
          onChange={event => onChange(Number(event.target.value))}
        >
          {options.map(option => (
            <option key={option} value={option}>
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
