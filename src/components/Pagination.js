import React from 'react';

export class Pagination extends React.Component {
  render() {
    return (
      <div className="ui container">
        <button
          type="button"
          className="ui green basic button"
        >
          Green
        </button>
        <button
          type="button"
          className="ui red basic button"
        >
          Red
        </button>
        <button
          type="button"
          className="ui green basic button"
        >
          Green
        </button>
      </div>
    );
  }
}
