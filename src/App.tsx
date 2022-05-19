import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import PageContent from './components/PageContent/PageContent';
import Pagination from './components/Pagination/Pagination';

interface State {
  total: number,
  page: number,
  currentPage: number,
}

class App extends React.Component<{}, State> {
  state = {
    total: 42,
    page: 1,
    currentPage: 1,
  };

  onPageChange = (selectedPage: number) => {
    this.setState({
      currentPage: selectedPage,
    });
  };

  handleBackButtonClick = () => {
    const prevPage = this.state.currentPage;

    if (prevPage > this.state.page) {
      this.setState(state => ({
        currentPage: state.currentPage - 1,
      }));
    }
  };

  handleForthButtonClick = () => {
    const prevPage = this.state.currentPage;

    if (prevPage < this.state.total) {
      this.setState(state => ({
        currentPage: state.currentPage + 1,
      }));
    }
  };

  render() {
    return (
      <>
        <h1>
          Pagination
        </h1>

        <div
          className="VersionTwo"
        >
          <Pagination
            first={this.state.page}
            last={this.state.total}
            current={this.state.currentPage}
            selectPage={this.onPageChange}
            moveBack={this.handleBackButtonClick}
            moveForth={this.handleForthButtonClick}
          />

          <Routes>
            <Route index element={<PageContent />} />
            <Route
              path="/:currentPage"
              element={
                <PageContent />
              }
            />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
