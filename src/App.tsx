import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import PageContent from './components/PageContent/PageContent';
import Pagination from './components/Pagination/Pagination';

interface State {
  total: number,
  page: number,
  currentPage: number,
  isFirstVisible: boolean,
  isPrecurrentVisible: boolean,
  isPostcurrentVisible: boolean,
  isPrecurrentFreeSpaceVisible: boolean,
  isPostcurrentFreeSpaceVisible: boolean,
  isLastVisible: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    total: 42,
    page: 1,
    currentPage: 1,
    isFirstVisible: false,
    isPrecurrentVisible: false,
    isPostcurrentVisible: true,
    isPrecurrentFreeSpaceVisible: false,
    isPostcurrentFreeSpaceVisible: true,
    isLastVisible: true,
  };

  setParemetersForValueOne = () => {
    this.setState({
      isFirstVisible: false,
      isLastVisible: true,
      isPrecurrentVisible: false,
      isPrecurrentFreeSpaceVisible: false,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: true,
    });
  };

  setParametersForValueTwo = () => {
    this.setState({
      isFirstVisible: true,
      isLastVisible: true,
      isPrecurrentVisible: false,
      isPrecurrentFreeSpaceVisible: false,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: true,
    });
  };

  setParametersForValueThree = () => {
    this.setState({
      isFirstVisible: true,
      isLastVisible: true,
      isPrecurrentVisible: true,
      isPrecurrentFreeSpaceVisible: false,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: true,
    });
  };

  setParametersForLastValue = () => {
    this.setState({
      isFirstVisible: true,
      isLastVisible: false,
      isPrecurrentVisible: true,
      isPrecurrentFreeSpaceVisible: true,
      isPostcurrentVisible: false,
      isPostcurrentFreeSpaceVisible: false,
    });
  };

  setParametersForSecondValueFromEnd = () => {
    this.setState({
      isFirstVisible: true,
      isLastVisible: false,
      isPrecurrentVisible: true,
      isPrecurrentFreeSpaceVisible: true,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: false,
    });
  };

  setParametersForThirdValueFromEnd = () => {
    this.setState({
      isFirstVisible: true,
      isLastVisible: true,
      isPrecurrentVisible: true,
      isPrecurrentFreeSpaceVisible: true,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: false,
    });
  };

  setParametersForRegularValue = () => {
    this.setState({
      isFirstVisible: true,
      isLastVisible: true,
      isPrecurrentVisible: true,
      isPrecurrentFreeSpaceVisible: true,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: true,
    });
  };

  onPageChange
  = (selectedPage: number) => {
    this.setState({
      currentPage: selectedPage,
    });

    if (selectedPage === this.state.page) {
      this.setParemetersForValueOne();

      return;
    }

    if (selectedPage === this.state.page + 1) {
      this.setParametersForValueTwo();

      return;
    }

    if (selectedPage === this.state.page + 2) {
      this.setParametersForValueThree();

      return;
    }

    if (selectedPage === this.state.total) {
      this.setParametersForLastValue();

      return;
    }

    if (selectedPage === this.state.total - 1) {
      this.setParametersForSecondValueFromEnd();

      return;
    }

    if (selectedPage === this.state.total - 2) {
      this.setParametersForThirdValueFromEnd();

      return;
    }

    this.setParametersForRegularValue();
  };

  handleBackButtonClick = () => {
    const prevPage = this.state.currentPage;

    this.setState(state => ({
      currentPage: state.currentPage - 1,
    }));

    if (prevPage === this.state.page + 1) {
      this.setParemetersForValueOne();

      return;
    }

    if (prevPage === this.state.page + 2) {
      this.setParametersForValueTwo();

      return;
    }

    if (prevPage === this.state.page + 3) {
      this.setParametersForValueThree();

      return;
    }

    if (prevPage === this.state.total) {
      this.setParametersForSecondValueFromEnd();

      return;
    }

    if (prevPage === this.state.total - 1) {
      this.setParametersForThirdValueFromEnd();

      return;
    }

    this.setParametersForRegularValue();
  };

  handleForthButtonClick = () => {
    const prevPage = this.state.currentPage;

    this.setState(state => ({
      currentPage: state.currentPage + 1,
    }));

    if (prevPage === this.state.page) {
      this.setParametersForValueTwo();

      return;
    }

    if (prevPage === this.state.page + 1) {
      this.setParametersForValueThree();

      return;
    }

    if (prevPage === this.state.total - 3) {
      this.setParametersForThirdValueFromEnd();

      return;
    }

    if (prevPage === this.state.total - 2) {
      this.setParametersForSecondValueFromEnd();

      return;
    }

    if (prevPage === this.state.total - 1) {
      this.setParametersForLastValue();

      return;
    }

    this.setParametersForRegularValue();
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
            precurrent={this.state.currentPage - 1}
            current={this.state.currentPage}
            postcurrent={this.state.currentPage + 1}
            last={this.state.total}
            isFirstVisible={this.state.isFirstVisible}
            isPrecurrentFreeSpaceVisible={
              this.state.isPrecurrentFreeSpaceVisible
            }
            isPrecurrentVisible={this.state.isPrecurrentVisible}
            isPostcurrentVisible={this.state.isPostcurrentVisible}
            isPostcurrentFreeSpaceVisible={
              this.state.isPostcurrentFreeSpaceVisible
            }
            isLastVisible={this.state.isLastVisible}
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
