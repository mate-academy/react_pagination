import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    tabs: [],
  };

  render() {
    const { tabs } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>{tabs.length} tabs</h1>
      </div>
    );
  }
}

export default App;
