import React from 'react';
import { PageNumbers } from './PageNumbers';
import { ShowItems } from './ShowItems';

interface Item {
  name: string,
}

type State = {
  total: Item[],
  perPage: number,
  currentPage: number,
};

class Pagination extends React.Component<{}, State> {
  state: State = {
    total: [],
    perPage: 5,
    currentPage: 1,
  };

  componentDidMount() {
    const array = this.fillTotal();

    this.setState({ total: array });
  }

  fillTotal = () => {
    const arrayOfItems = [];

    for (let i = 1; i <= 42; i += 1) {
      arrayOfItems.push({ name: `${i}` });
    }

    return arrayOfItems;
  };

  setPrevPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage === 1 ? 1 : prevState.currentPage - 1,
    }));
  };

  setNextPage = () => {
    const {
      total,
      perPage,
    } = this.state;

    this.setState(prevState => ({
      currentPage: prevState.currentPage === Math.ceil(total.length / perPage)
        ? Math.ceil(total.length / perPage)
        : prevState.currentPage + 1,
    }));
  };

  setPage = (page: number) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      total,
      perPage,
      currentPage,
    } = this.state;

    const pages = [];

    for (let i = 1; i <= Math.ceil(total.length / perPage); i += 1) {
      pages.push(i);
    }

    const lastItemIndex = currentPage * perPage;
    const firstItemIndex = lastItemIndex - perPage;

    return (
      <>
        <ShowItems
          total={total}
          perPage={perPage}
          firstItemIndex={firstItemIndex}
        />

        <label
          htmlFor="select"
          className="items__input--per-page"
        >
          Items per page:
          <select
            id="select"
            name="perPage"
            value={perPage}
            onChange={(event) => {
              this.setState({
                perPage: +event.target.value,
                currentPage: 1,
              });
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>

        <PageNumbers
          pages={pages}
          setPage={this.setPage}
          setPrevPage={this.setPrevPage}
          setNextPage={this.setNextPage}
          currentPage={currentPage}
        />
      </>
    );
  }
}

export default Pagination;
