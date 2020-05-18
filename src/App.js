import React from 'react';
import './App.scss';
import TabsList from './components/TabsList';
import Pagination from './components/Pagination';

const options = [1, 2, 3, 5, 10, 20];

const generateTabs = (amount) => {
  const result = [];

  for (let i = 1; i <= amount; i += 1) {
    result.push({
      title: `Tab ${i}`,
      content: `Some text ${i}`,
    });
  }

  return result;
};

class App extends React.Component {
  state = {
    page: 1,
    itemsPerPage: 1,
  };

  switchPage = (newPage) => {
    this.setState({
      page: newPage,
    });
  };

  changeItemsPerPage = (event) => {
    this.setState({
      itemsPerPage: +event.target.value,
      page: 1,
    });
  }

  render() {
    const { page, itemsPerPage } = this.state;
    const tabs = generateTabs(120);
    const firstTab = (page - 1) * itemsPerPage + 1;
    const lastTab = page * itemsPerPage;
    const visibleTabs = tabs.filter(
      (_, index) => index >= firstTab - 1 && index < lastTab,
    );

    return (
      <div className="App">
        <h1 className="main-title ui header violet">
          {`${tabs.length} Tabs`}
        </h1>

        <div className="select">
          <label htmlFor="select__pages">Items per page: &nbsp;</label>
          <select
            id="select__pages"
            onChange={this.changeItemsPerPage}
            className="select__pages ui fluid dropdown"
          >
            {options.map(option => (
              <option
                value={option}
                key={option}
                className="select__option"
              >
                {option}
              </option>
            ))}
          </select>
          <p>{`Current page: ${page}`}</p>
        </div>

        <Pagination
          totalItemsAmount={tabs.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onSwitch={this.switchPage}
          firstItem={firstTab}
          lastItem={lastTab}
        />

        <TabsList
          tabs={visibleTabs}
        />
      </div>
    );
  }
}

export default App;
