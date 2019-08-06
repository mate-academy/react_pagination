import React from 'react';
import './App.css';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    tabs: [
      { title: 'Tab 1', content: 'Some text 1' },
      { title: 'Tab 2', content: 'Some text 2' },
      { title: 'Tab 3', content: 'Some text 3' },
      { title: 'Tab 4', content: 'Some text 4' },
      { title: 'Tab 5', content: 'Some text 5' },
      { title: 'Tab 6', content: 'Some text 6' },
      { title: 'Tab 7', content: 'Some text 7' },
      { title: 'Tab 8', content: 'Some text 8' },
      { title: 'Tab 9', content: 'Some text 9' },
      { title: 'Tab 10', content: 'Some text 10' },
      { title: 'Tab 11', content: 'Some text 11' },
      { title: 'Tab 12', content: 'Some text 12' },
      { title: 'Tab 13', content: 'Some text 13' },
      { title: 'Tab 14', content: 'Some text 14' },
      { title: 'Tab 15', content: 'Some text 15' },
      { title: 'Tab 16', content: 'Some text 16' },
      { title: 'Tab 17', content: 'Some text 17' },
      { title: 'Tab 18', content: 'Some text 18' },
      { title: 'Tab 19', content: 'Some text 19' },
      { title: 'Tab 20', content: 'Some text 20' },
    ],
    page: 1,
    perPage: 5,
  };

  onPageChange = (page) => {
    this.setState({
      page,
    });
  };

  onPerPageChange = (event) => {
    this.setState({
      page: 1,
      perPage: event.target.value,
    });
  };

  render() {
    const { tabs, page, perPage } = this.state;
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentTabs = tabs.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Page № {page}</h1>
        <span>Items per page</span>

        <select onChange={this.onPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <table>
          {currentTabs.map(tab => (
            <tr>
              <td>{tab.title}</td>
              <td>{tab.content}</td>
            </tr>
          ))}
        </table>

        <Pagination
          page={page}
          total={tabs.length}
          perPage={perPage}
          onPageChange={this.onPageChange}
        />

      </div>
    );
  }
}

export default App;
