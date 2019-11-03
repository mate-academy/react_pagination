import React, {PureComponent} from 'react';
import { Pagination, List, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class PaginationWithContent extends PureComponent {
  state = {
    total: this.props.total,
    perPage: this.props.perPage,
    page: this.props.page,
    todos: Array(this.props.total * this.props.perPage)
      .fill('').map((item, index) => ({
        id: index + 1,
        content: `Todo №${index + 1}`,
      })),
    activePage: this.props.page,
    selectOptions: Array(5).fill('')
      .map((item, index) => ({
        value: (index + 1) * 5,
        text: (index + 1) * 5,
      })),
  }

  handlePaginationChange = (event) => {
    const { target: { textContent } } = event;
    let newActivePage = Number(textContent);

    this.setState((prevState) => {
      if (isNaN(newActivePage)) {
        const { activePage, total } = prevState;

        if (textContent === '⟨' && activePage > 1) {
          newActivePage = prevState.activePage - 1;
        } else if (textContent === '«') {
          newActivePage = 1;
        } else if (textContent === '⟩' && activePage < total) {
          newActivePage = prevState.activePage + 1;
        } else if (textContent === '»') {
          newActivePage = total;
        } else {
          return;
        }
      }

      return ({
        activePage: newActivePage,
      });
    });
  };

  handleSelectChange = (event) => {
    const { target: { textContent } } = event;

    this.setState((prevState) => {
      let newPerPage = prevState;

      if (Number(textContent) !== newPerPage) {
        newPerPage = Number(textContent);
      }

      return ({
        perPage: newPerPage,
        todos: Array(this.props.total * newPerPage)
          .fill('').map((item, index) => ({
            id: index + 1,
            content: `Todo №${index + 1}`,
          })),
      });
    });
  }

  render() {
    const { total, perPage, page, todos, activePage, selectOptions } = this.state;
    const from = activePage !== 1 ? (activePage - 1) * perPage : 0;
    const to = activePage !== 1 ? (activePage - 1) * perPage + perPage : perPage;
    const pageTodos = todos.filter((todo, index) => index >= from && index < to);

    return (
      <>
        <div className="pageContent">
          <List celled ordered>
            {pageTodos.map(todo => <List.Item key={todo.id}>{todo.content}</List.Item>)}
          </List>
          <p className="todosOnPage">{`todos: ${from + 1} - ${to} of ${todos.length}`}</p>
          <Pagination defaultActivePage={page} totalPages={total} onClick={this.handlePaginationChange} />
          <br />
          <br />
          <Select
            placeholder="Select how much todos show per page"
            options={selectOptions}
            onChange={this.handleSelectChange}
          />
        </div>
      </>
    );
  }
}

PaginationWithContent.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
};

PaginationWithContent.defaultProps = {
  perPage: 5,
  page: 1,
}

export default PaginationWithContent;
