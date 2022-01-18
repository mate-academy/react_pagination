import { Component } from 'react';
// import classNames from 'classnames';

import './Select.scss';

type Props = {
  onPerPageChange: (perPage: number) => void,
  perPage: number,
};

export class Select extends Component<Props> {
  state = {};

  render() {
    const { onPerPageChange, perPage } = this.props;

    return (
      <select
        value={perPage}
        onChange={(e) => onPerPageChange(+e.target.value)}
        className="select"
      >
        <option>3</option>
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    );
  }
}
