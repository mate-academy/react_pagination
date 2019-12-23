/* eslint-disable */
import React from 'react';

class Content extends React.Component {
  render() {
    const { tabs } = this.props;

    return (
      <div className="App-body">
        {tabs.map(tab => (
          <div className="App-body__tab">
            <h6 className="App-body__tab-head">{tab.title}</h6>
            <p className="App-body__tab-content">{tab.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Content;
