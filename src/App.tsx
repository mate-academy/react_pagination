import { Component } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const maxItems = 42;
const itemsPageAmount = [3, 5, 10, 20];
const items = getNumbers(1, maxItems)
  .map(n => `Item ${n}`);

type State = {
  itemsPerPage: number,
  currentPage: number,
};

export class App extends Component {
  state: Readonly<State> = {
    itemsPerPage: 3,
    currentPage: 1,
  };

  setItemsPerPage = (amount: number) => {
    this.setState({
      currentPage: 1,
    });

    this.setState({
      itemsPerPage: amount,
    });
  };

  setCurrentPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const page = event.target as HTMLAnchorElement;

    if (page.dataset.cy === 'pageLink') {
      this.setState({
        currentPage: Number(page.textContent),
      });
    }

    if (page.dataset.cy === 'prevLink') {
      this.setState((state: State) => ({
        currentPage: state.currentPage - 1,
      }));
    }

    if (page.dataset.cy === 'nextLink') {
      this.setState((state: State) => ({
        currentPage: state.currentPage + 1,
      }));
    }
  };

  getVisibleItems = (
    itemsFromServer: string[],
    itemsPerPage: number,
    numberPage: number,
  ) => (
    itemsFromServer
      .slice(
        itemsPerPage * numberPage - itemsPerPage,
        itemsPerPage * numberPage,
      )
  );

  render() {
    const { currentPage, itemsPerPage } = this.state;
    const pageAmount = Math.ceil(items.length / itemsPerPage);
    const showItems = ` ${currentPage * itemsPerPage - itemsPerPage + 1}`
      + ` - ${(currentPage * itemsPerPage > maxItems) ? (maxItems) : (currentPage * itemsPerPage)} `;

    const visibleItems = this.getVisibleItems(
      items, itemsPerPage, this.state.currentPage,
    );

    return (
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          {`Page ${currentPage} (items ${showItems} of ${maxItems})`}
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              onChange={event => {
                this.setItemsPerPage(+event.target.value);
              }}
            >
              {itemsPageAmount.map(itemsAmount => (
                <option value={itemsAmount} key={itemsAmount}>
                  { itemsAmount }
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="perPageSelector" className="col-form-label col">
            items per page
          </label>
        </div>

        <Pagination
          items={visibleItems}
          pageAmount={pageAmount}
          currentPage={currentPage}
          onPageChange={this.setCurrentPage}
        />
      </div>
    );
  }
}

export default App;
