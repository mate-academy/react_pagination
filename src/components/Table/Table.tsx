import { Items } from '../Items';
import { Pagination } from '../Pagination';

type Props = {
  view:() => string[];
  pages: string[];
  items: string[]
  pageCur: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (page: number) => void;
};

export const Table: React.FC<Props> = ({
  view,
  pages,
  pageCur,
  items,
  limit,
  setPage,
  setLimit,
}) => {
  const startItem: number = (pageCur - 1) * limit + 1;
  const endItem: number = Math.min(pageCur * limit, items.length);

  return (
    <>
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageCur} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setLimit(parseInt(event.target.value, 10));
              setPage(1);
            }}
            defaultValue={limit}
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

      <Pagination
        pages={pages}
        pageCur={pageCur}
        setPage={setPage}
      />

      <Items view={view} />
    </>
  );
};
