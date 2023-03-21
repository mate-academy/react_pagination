import { ItemsCount } from '../../types/ItemsCount';

type PerPageSelectorProps = {
  onPerPageChange: (numberOfItems: number) => void;
  currentAmountOfItems: number,
};

const itemsAmount = Object.keys(ItemsCount).slice(0, 4);

export const PerPageSelector: React.FC<PerPageSelectorProps> = ({
  onPerPageChange,
  currentAmountOfItems,
}) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          onChange={(e) => onPerPageChange(+e.target.value)}
          value={currentAmountOfItems}
        >
          {itemsAmount.map(amount => (
            <option
              key={amount}
              value={amount}
            >
              {amount}
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
