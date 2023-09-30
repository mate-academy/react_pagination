import React from 'react';

type Props = {
  perPage: number;
  handlerPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void ;
};

export const FormGroup: React.FC<Props> = ({
  perPage,
  handlerPerPage,
}) => (
  <div className="form-group row">
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        className="form-control"
        value={perPage}
        onChange={handlerPerPage}
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
