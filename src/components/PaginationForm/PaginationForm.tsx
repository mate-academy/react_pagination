import { FC } from 'react';

interface Props {
  perPage: number;
  handlePerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PER_PAGE_OPTIONS = [3, 5, 10, 20];

export const PaginationForm: FC<Props> = ({
  perPage,
  handlePerPageChange,
}) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          value={perPage}
          onChange={handlePerPageChange}
        >
          {PER_PAGE_OPTIONS.map(option => (
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
