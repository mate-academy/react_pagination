import React from 'react';

type Props = {
  totalElements: number;
  setTotalElements: (totalElements: number) => void;
  elementsPerPage: number;
  setElementsPerPage: (elementsPerPage: number) => void;
  withInfo: boolean;
  setWithInfo: (withInfo: boolean) => void;
};

export const Settings: React.FC<Props> = ({
  totalElements,
  setTotalElements,
  elementsPerPage,
  setElementsPerPage,
  withInfo,
  setWithInfo,
}) => {
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <span>Set total amount elements: </span>
        <input
          type="number"
          defaultValue={totalElements}
          min={1}
          onChange={(event) => setTotalElements(+event.target.value)}
        />
      </div>
      <div>
        <span>Set amount elements per page: </span>
        <select
          name="elementsPerPage"
          value={elementsPerPage}
          onChange={(event) => setElementsPerPage(+event.target.value)}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <form>
        <span>Set with info: </span>
        <label>
          <input
            type="radio"
            name="WithInfo"
            checked={withInfo}
            value="true"
            onChange={(event) => setWithInfo(event.target.value === 'true')}
          />
          <span>True</span>
        </label>
        <label>
          <input
            type="radio"
            name="WithInfo"
            checked={!withInfo}
            value="false"
            onChange={(event) => setWithInfo(event.target.value === 'true')}
          />
          <span>False</span>
        </label>
      </form>
    </div>
  );
};
