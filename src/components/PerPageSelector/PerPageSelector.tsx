import { PerPage, perPageOptions } from '../../types/PerPage';

interface Props {
  itemsList: string[];
  perPage: number;
  setPerPage: (newValue: PerPage) => void;
  setMaxPagesCount: (newValue: number) => void;
  setPageNumber: (newValue: number) => void;
}

export const PerPageSelector = ({
  itemsList,
  perPage,
  setPerPage,
  setMaxPagesCount,
  setPageNumber,
}: Props) => (
  <div className="form-group row">
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        value={perPage}
        className="form-control"
        onChange={event => {
          const newPerPageValue = (e: React.ChangeEvent<HTMLSelectElement>) =>
            +e.target.value as PerPage;

          setPerPage(newPerPageValue(event));
          setMaxPagesCount(
            Math.ceil(itemsList.length / newPerPageValue(event)),
          );
          setPageNumber(1);
        }}
      >
        {perPageOptions.map((option: PerPage) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>

    <label htmlFor="perPageSelector" className="col-form-label col">
      items per page
    </label>
  </div>
);
