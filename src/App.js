import React from 'react';
import { Pagination } from './Components/Pagination';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends React.Component {
    state = {
      total: 42,
      itemsOnPage: 5,
      page: 1,
    }

    values = [3, 5, 10, 20];

    onChangePage = (currentPage) => {
      this.setState({
        page: currentPage,
      });
    }

    onChangePageValues = (newAmount) => {
      this.setState({
        itemsOnPage: newAmount,
        page: 1,
      });
    }

    makeArr = () => {
      const { itemsOnPage, page } = this.state;
      const start = ((page * itemsOnPage) - itemsOnPage) + 1;
      const items = new Array(itemsOnPage);

      for (let i = 0; i < items.length; i += 1) {
        items[i] = start + i;
      }

      return items;
    }

    render() {
      const {
        onChangePage,
        onChangePageValues,
        makeArr,
        values,
      } = this;

      const {
        page,
        total,
        itemsOnPage,
      } = this.state;

      return (
        <div className="d-flex flex-column App">
          <select
            name="page"
            className="p-2 m-auto"
            value={itemsOnPage}
            onChange={({ target }) => onChangePageValues(+target.value)}
          >

            {values.map(value => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))
                    }

          </select>

          <ul className="list-group">
            {makeArr().map(item => (
              <li
                key={item}
                className="list-group-item"
              >
                {item}
              </li>
            ))}
          </ul>

          <Pagination
            total={total}
            itemsOnPage={itemsOnPage}
            page={page}
            onChangePage={onChangePage}
          />
        </div>
      );
    }
}

export default App;
