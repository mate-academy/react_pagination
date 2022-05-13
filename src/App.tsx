import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import PageContent from './components/PageContent/PageContent';
import Pagination from './components/Pagination/Pagination';
import Pagination2 from './components/Pagination2/Pagination2';

interface State {
  total: number,
  perPage: number,
  page: number,
  withInfo: boolean,
  currentPage: number,
  isVersionOneUsed: boolean,
  current: number,
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
    perPage: 5,
    page: 1,
    withInfo: true,
    currentPage: 1,
    isVersionOneUsed: false,
    current: 1,
    isFirstVisible: false,
    isPrecurrentVisible: false,
    isPostcurrentVisible: true,
    isPrecurrentFreeSpaceVisible: false,
    isPostcurrentFreeSpaceVisible: true,
    isLastVisible: true,
  };

  changeVersion = () => {
    this.setState((state) => ({
      isVersionOneUsed: !state.isVersionOneUsed,
    }));
  };

  onPageChange = (selectedPage: number) => {
    this.setState({
      currentPage: selectedPage,
    });
  };

  handlePrevButtonClick = () => {
    if (this.state.currentPage === this.state.page) {
      this.setState((prevState) => {
        return {
          page: prevState.page - 1,
        };
      });
    }

    this.setState((prevState) => {
      return {
        currentPage: prevState.currentPage - 1,
      };
    });
  };

  handleNextButtonClick = () => {
    if (this.state.currentPage
      === this.state.page + this.state.perPage - 1) {
      this.setState((prevState) => {
        return {
          page: prevState.page + 1,
        };
      });
    }

    this.setState((prevState) => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };

  setStartPage = (selectedFrameSize: number) => {
    let startPage: number;

    if (this.state.currentPage - this.state.page > selectedFrameSize) {
      startPage = this.state.currentPage - selectedFrameSize + 1;
    } else {
      startPage = this.state.page;
    }

    return startPage;
  };

  onPerPageChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      page: this.setStartPage(parseInt(event.target.value, 10)),
      perPage: +event.target.value,
    });
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

  onPageChangeVersionTwo
  = (selectedPage: number) => {
    this.setState({
      current: selectedPage,
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
    const prevPage = this.state.current;

    this.setState(state => ({
      current: state.current - 1,
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
    const prevPage = this.state.current;

    this.setState(state => ({
      current: state.current + 1,
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

        <select
          className="ChangeVersion"
          defaultValue="VersionTwo"
          onChange={this.changeVersion}
        >
          <option
            value="VersionOne"
          >
            Version One
          </option>
          <option
            value="VersionTwo"
          >
            Version Two
          </option>
        </select>

        <div
          className="VersionOne"
          hidden={!this.state.isVersionOneUsed}
        >
          <select
            className="ChangePerPage"
            defaultValue={5}
            onChange={this.onPerPageChange}
          >
            <option
              value="3"
            >
              Pages to display 3
            </option>
            <option
              value="5"
            >
              Pages to display 5
            </option>
            <option
              value="10"
            >
              Pages to display 10
            </option>
            <option
              value="20"
            >
              Pages to display 20
            </option>
          </select>

          <nav
            className="PagesContainer"
          >
            <button
              type="button"
              className="PrevButton"
              disabled={
                this.state.currentPage === 1
              }
              onClick={this.handlePrevButtonClick}
            >
              Prev
            </button>

            <Pagination
              total={this.state.total}
              perPage={this.state.perPage}
              page={this.state.page}
              currentPage={this.state.currentPage}
              withInfo={this.state.withInfo}
              selectPage={this.onPageChange}
            />

            <button
              type="button"
              className="NextButton"
              disabled={
                this.state.currentPage
                === this.state.total
              }
              onClick={this.handleNextButtonClick}
            >
              Next
            </button>
          </nav>
        </div>

        <div
          className="VersionTwo"
          hidden={this.state.isVersionOneUsed}
        >
          <Pagination2
            first={this.state.page}
            precurrent={this.state.current - 1}
            current={this.state.current}
            postcurrent={this.state.current + 1}
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
            selectPage={this.onPageChangeVersionTwo}
            moveBack={this.handleBackButtonClick}
            moveForth={this.handleForthButtonClick}
          />

          <Routes>
            <Route index element={<PageContent />} />
            <Route
              path={`/page=${this.state.current}`}
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
