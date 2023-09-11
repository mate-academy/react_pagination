enum SelectValue {
  THREE = 3,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
}

type Props = {
  perPage: number
  onChangeSize: (event: React.ChangeEvent<HTMLSelectElement>) => void
};

export const PageSizeSelect: React.FC<Props> = ({
  perPage,
  onChangeSize,
}) => {
  return (
    <select
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      defaultValue={perPage}
      onChange={onChangeSize}
    >
      <option value={SelectValue.THREE}>{SelectValue.THREE}</option>
      <option value={SelectValue.FIVE}>{SelectValue.FIVE}</option>
      <option value={SelectValue.TEN}>{SelectValue.TEN}</option>
      <option value={SelectValue.TWENTY}>{SelectValue.TWENTY}</option>
    </select>
  );
};
