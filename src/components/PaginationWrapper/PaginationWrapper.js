import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '../Pagination';
import { PaginationSelect } from '../PaginationSelect/PaginationSelect';

export class PaginationWrapper extends React.Component {
  state = {
    total: 42,
  }

  get page() {
    return Number(this.props.queryParams.page);
  }

  get perPage() {
    return Number(this.props.queryParams.perPage);
  }

  setPages = (page, perPage) => (
    this.props.history.push(`/?page=${page}&perPage=${perPage}`)
  )

  #getLastItemOnPage = () => (
    this.page * this.perPage > this.state.total
      ? this.state.total
      : this.page * this.perPage
  )

  render() {
    return (
      <>
        <h2 className="display-4 text-center">
          { this.page * this.perPage - this.perPage + 1 }
          &nbsp;-&nbsp;
          { this.#getLastItemOnPage() }
          &nbsp;of&nbsp;
          { this.state.total}
        </h2>
        <PaginationSelect handleOnChange={this.setPages} page={this.page} />
        <Pagination
          page={this.page}
          perPage={this.perPage}
          total={this.state.total}
          setUrlPage={this.setPages}
        />
      </>
    );
  }
}

PaginationWrapper.propTypes = {
  queryParams: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
