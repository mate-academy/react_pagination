type Props = {
  values: number[],
  perPage: number;
  onPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const Selector: React.FC<Props> = ({
  values,
  perPage,
  onPerPageChange,
}) => (
  <div className="form-group row">
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        className="form-control"
        value={perPage}
        onChange={onPerPageChange}
      >
        {values.map(value => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </div>

    <label htmlFor="perPageSelector" className="col-form-label col">
      items per page
    </label>
  </div>
);
