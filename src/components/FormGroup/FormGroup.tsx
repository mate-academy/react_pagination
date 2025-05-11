import { useEffect } from 'react';
import { perPage, maxAmount } from '../../variables/variables';
import { getInitialPages } from '../../utils';

type FormGroupProps = {
  setVisibleList: (initList: number[]) => void;
  visibleList: number[];
  pages: number;
  setPages: (itemsAmount: number) => void;

  activePage: number;
  initList: number[];
  perPageInit: number;
  setPerPage: (perPageInit: number) => void;
};

export const FormGroup: React.FC<FormGroupProps> = ({
  activePage,
  initList,
  setVisibleList,
  setPerPage,
  perPageInit,
  setPages,
}) => {
  useEffect(() => {
    const endIndex = perPageInit * activePage;
    const startIndex = endIndex - perPageInit;
    const itemsInThePage = [...initList].slice(startIndex, endIndex);

    setVisibleList(itemsInThePage);
    setPages(getInitialPages(maxAmount, perPageInit));
  }, [perPageInit, activePage, initList, setVisibleList, setPages]);

  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          onChange={event => {
            setPerPage(Number(event.target.value));
          }}
        >
          {perPage.map(amount => (
            <option value={amount} key={amount}>
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
