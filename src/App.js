import React from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';
import Controls from './components/Controls/Controls';

class App extends React.Component {
  state = {
    numberOfItems: 42,
    itemsPerPage: 5,
    currentPage: 1,
    isAdditionalInfo: false,
    isChangedView: false,
  };

  changeCurrentPage = (event) => {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.name),
    });
  }

  changeToPrevOrNextPage = (event, name) => {
    event.preventDefault();
    this.setState(({ currentPage }) => ({
      currentPage: name === 'prev-page'
        ? currentPage - 1
        : currentPage + 1,
    }));
  }

  showAdditionalInfo = () => {
    this.setState(({ isAdditionalInfo }) => ({
      isAdditionalInfo: !isAdditionalInfo,
    }));
  }

  handleSelect = (value) => {
    this.setState(({ itemsPerPage, currentPage }) => ({
      itemsPerPage: value,
      currentPage: Math.ceil(
        ((currentPage * itemsPerPage) - itemsPerPage) / value
      ) || 1,
    }));
  }

  changeView = () => {
    this.setState(({ isChangedView }) => ({
      isChangedView: !isChangedView,
    }));
  }

  render() {
    const {
      numberOfItems,
      itemsPerPage,
      currentPage,
      isAdditionalInfo,
      isChangedView,
    } = this.state;

    return (
      <div className="App">
        <Controls
          showAdditionalInfo={this.showAdditionalInfo}
          itemsPerPage={itemsPerPage}
          handleSelect={this.handleSelect}
          changeView={this.changeView}
        />
        {/* eslint-disable-next-line */}
        <Pagination
          numberOfItems={numberOfItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          changeCurrentPage={this.changeCurrentPage}
          changeToPrevOrNextPage={this.changeToPrevOrNextPage}
          isAdditionalInfo={isAdditionalInfo}
          isChangedView={isChangedView}
        />
      </div>
    );
  }
}

export default App;
