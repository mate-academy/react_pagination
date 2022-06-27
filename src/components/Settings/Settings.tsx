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

      <div>
        <span>Set with info: </span>
        <select
          name="setWithInfo"
          value={withInfo === true ? 'true' : 'false'}
          onChange={(event) => {
            if (event.target.value === 'true') {
              return setWithInfo(true);
            }

            return setWithInfo(false);
          }}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </div>
  );
};
