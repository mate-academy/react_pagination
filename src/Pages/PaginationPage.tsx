import { FC, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import { getSearchWith } from '../utils/searchHelper';
import { getNumbers } from '../utils/getNumbers';

const totalNumberOfItems = 42;
const items = getNumbers(1, totalNumberOfItems);

export const PaginationPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '5';

  useEffect(() => {
    setSearchParams(
      getSearchWith(searchParams, { page, perPage }),
    );
  }, []);

  const handleSelectChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams(
        getSearchWith(searchParams, { page: '1', perPage: value }),
      );
    }, [searchParams],
  );

  const calculateItemRange = useCallback(
    (
      currentPage: string,
      itemsPerPage: string,
      elements?: string[],
    ) => {
      const startIndex = (+currentPage - 1) * +itemsPerPage;
      const endIndex = Math.min(startIndex + +itemsPerPage, totalNumberOfItems);

      return elements
        ? elements.slice(startIndex, endIndex)
        : [`${startIndex + 1} - ${endIndex}`];
    }, [totalNumberOfItems],
  );

  return (
    <>
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${calculateItemRange(page, perPage)} of ${totalNumberOfItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelectChange}
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
        currentPage={page}
        itemsToShow={calculateItemRange(page, perPage, items)}
        pages={getNumbers(1, Math.ceil(totalNumberOfItems / +perPage))}
      />
    </>
  );
};
