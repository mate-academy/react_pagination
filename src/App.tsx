import React from 'react';
import { Pagination } from './components/Pagination';

interface State {
  total: number;
  perPage: number;
  page: number;
}

class App extends React.Component<{}, State> {
  state = {
    total: 42,
    perPage: 5,
    page: 5,
  };

  onPageChange = (page: number) => {
    if (page !== this.state.page) {
      this.setState({ page });
    }
  };

  onPerPageChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const perPage = +e.currentTarget.value;

    this.setState(state => {
      const maxPage = Math.ceil(state.total / perPage);

      return {
        perPage,
        page: state.page > maxPage ? maxPage : state.page,
      };
    });
  };

  render() {
    const {
      total,
      perPage,
      page,
    } = this.state;

    return (
      <div className="page">
        <form className="box">
          <div className="field is-flex is-justify-content-center">
            <label htmlFor="perPage" className="label">
              Items per page:
              <div className="control mt-2">
                <div className="select is-rounded is-medium">
                  <select
                    onChange={this.onPerPageChange}
                    value={perPage}
                    id="perPage"
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
            </label>
          </div>
        </form>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onClick={this.onPageChange}
          withInfo
        />
      </div>
    );
  }
}

export default App;
