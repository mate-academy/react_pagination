type Props = {
  selectOptions: number[],
  selectValue: number,
  setOptionPage: (value: number) => void,
  resetPage: (page: number) => void,
};

export const Select: React.FC<Props> = ({
  selectOptions,
  selectValue,
  setOptionPage,
  resetPage,
}) => (
  <div className="form-group row">
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        className="form-control"
        value={selectValue}
        onChange={(event) => {
          setOptionPage(+event.target.value);
          resetPage(1);
        }}
      >
        {selectOptions.map((option: number) => (
          <option
            value={option}
            key={option}
          >
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
