type Props = {
  selectValue: number,
  setOptionPage: (value: number) => void,
  ressetPage: (page: number) => void,
};

const selectOption = [3, 5, 10, 20];

export const Select: React.FC<Props> = ({
  selectValue,
  setOptionPage,
  ressetPage,
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
          ressetPage(1);
        }}
      >
        {selectOption.map((option: number) => (
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
