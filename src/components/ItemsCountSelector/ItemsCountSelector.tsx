import React from 'react';

type Props = {
  itemsPerPageSelector: number[];
  itemsPerPage: number;
  ChangeElementsCount: (value: number) => void;
};

export const ItemsCountSelector: React.FC<Props> = ({
  itemsPerPageSelector,
  itemsPerPage,
  ChangeElementsCount,
}) => {
  function isCountChanged(count: number) {
    return count !== itemsPerPage;
  }

  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          value={itemsPerPage}
          onChange={e =>
            isCountChanged(Number(e.target.value)) &&
            ChangeElementsCount(Number(e.target.value))
          }
        >
          {itemsPerPageSelector.map(element => (
            <option key={element} value={element}>
              {element}
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
