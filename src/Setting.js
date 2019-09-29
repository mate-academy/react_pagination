import React from 'react';

const Setting = ({ toggleSetting, toggleButtonsChangedQuantity, perPage }) => (
  <div className="toggle-setting">
    <p>Show how many elements on page:</p>
    <input
      name="withInfo"
      onChange={toggleSetting}
      type="checkbox"
      className="with-info"
    />

    <p>Quantity elements on page:</p>
    <select
      onChange={event => toggleButtonsChangedQuantity(event)}
      value={perPage}
      className="repPage"
    >
      <option value={3}>3</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>

    <p className="change-view">Change view:</p>
    <input
      name="changeView"
      onChange={toggleSetting}
      type="checkbox"
      className="with-info"
    />
  </div>
);

export default Setting;
