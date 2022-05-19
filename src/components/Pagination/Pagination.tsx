import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pagination.scss';

interface PaginationState {
  precurrent: number,
  postcurrent: number,
  isFirstVisible: boolean,
  isPrecurrentVisible: boolean,
  isPostcurrentVisible: boolean,
  isPrecurrentFreeSpaceVisible: boolean,
  isPostcurrentFreeSpaceVisible: boolean,
  isLastVisible: boolean,
}

type Props = {
  first: number,
  last: number,
  current: number,
  selectPage: (selectedPage: number) => void,
  moveBack: () => void,
  moveForth: () => void,
};

class Pagination extends React.Component <Props, PaginationState> {
  state = {
    precurrent: this.props.current - 1,
    postcurrent: this.props.current + 1,
    isFirstVisible: false,
    isPrecurrentVisible: false,
    isPostcurrentVisible: true,
    isPrecurrentFreeSpaceVisible: false,
    isPostcurrentFreeSpaceVisible: true,
    isLastVisible: true,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.current !== this.props.current) {
      switch (this.props.current) {
        case this.props.first:
          this.setParemetersForValueOne();
          break;
        case this.props.first + 1:
          this.setParametersForValueTwo();
          break;
        case this.props.first + 2:
          this.setParametersForValueThree();
          break;
        case this.props.last:
          this.setParametersForLastValue();
          break;
        case this.props.last - 1:
          this.setParametersForSecondValueFromEnd();
          break;
        case this.props.last - 2:
          this.setParametersForThirdValueFromEnd();
          break;
        default:
          this.setParametersForRegularValue();
      }
    }
  }

  setParametersForRegularValue = () => {
    this.setState({
      precurrent: this.props.current - 1,
      postcurrent: this.props.current + 1,
      isFirstVisible: true,
      isLastVisible: true,
      isPrecurrentVisible: true,
      isPrecurrentFreeSpaceVisible: true,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: true,
    });
  };

  setParemetersForValueOne = () => {
    this.setState({
      precurrent: this.props.current - 1,
      postcurrent: this.props.current + 1,
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
      precurrent: this.props.current - 1,
      postcurrent: this.props.current + 1,
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
      precurrent: this.props.current - 1,
      postcurrent: this.props.current + 1,
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
      precurrent: this.props.current - 1,
      postcurrent: this.props.current + 1,
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
      precurrent: this.props.current - 1,
      postcurrent: this.props.current + 1,
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
      precurrent: this.props.current - 1,
      postcurrent: this.props.current + 1,
      isFirstVisible: true,
      isLastVisible: true,
      isPrecurrentVisible: true,
      isPrecurrentFreeSpaceVisible: true,
      isPostcurrentVisible: true,
      isPostcurrentFreeSpaceVisible: false,
    });
  };

  render() {
    return (
      <nav className="PagesContainer">
        <NavLink
          className="PageLink VersionTwoButton Back"
          to={`/page=${this.props.current - 1}`}
          onClick={this.props.moveBack}
          style={{
            pointerEvents: (this.props.current === this.props.first)
              ? 'none' : 'auto',
          }}
        >
          &lt;
        </NavLink>
        <ul
          className="PagesPanel"
        >
          <li
            className="ItemPage"
            hidden={!this.state.isFirstVisible}
          >
            <NavLink
              className="PageLink"
              to={`/page=${this.props.first}`}
              onClick={() => {
                this.props.selectPage(this.props.first);
              }}
            >
              {this.props.first}
            </NavLink>
          </li>
          <li
            className="FreeSpace"
            hidden={!this.state.isPrecurrentFreeSpaceVisible}
          >
            ...
          </li>
          <li
            className="ItemPage"
            hidden={!this.state.isPrecurrentVisible}
          >
            <NavLink
              className="PageLink"
              to={`/page=${this.state.precurrent}`}
              onClick={() => {
                this.props.selectPage(this.state.precurrent);
              }}
            >
              {this.state.precurrent}
            </NavLink>
          </li>
          <li
            className="ItemPage"
          >
            <NavLink
              className="PageLink"
              to={`/page=${this.props.current}`}
              onClick={() => {
                this.props.selectPage(this.props.current);
              }}
            >
              {`[${this.props.current}]`}
            </NavLink>
          </li>
          <li
            className="ItemPage"
            hidden={!this.state.isPostcurrentVisible}
          >
            <NavLink
              className="PageLink"
              to={`/page=${this.state.postcurrent}`}
              onClick={() => {
                this.props.selectPage(this.state.postcurrent);
              }}
            >
              {this.state.postcurrent}
            </NavLink>
          </li>
          <li
            className="FreeSpace"
            hidden={!this.state.isPostcurrentFreeSpaceVisible}
          >
            ...
          </li>
          <li
            className="ItemPage"
            hidden={!this.state.isLastVisible}
          >
            <NavLink
              className="PageLink"
              to={`/page=${this.props.last}`}
              onClick={() => {
                this.props.selectPage(this.props.last);
              }}
            >
              {this.props.last}
            </NavLink>
          </li>
        </ul>
        <NavLink
          className="PageLink VersionTwoButton Forth"
          to={`/page=${this.props.current + 1}`}
          onClick={this.props.moveForth}
          style={{
            pointerEvents: (this.props.current === this.props.last)
              ? 'none' : 'auto',
          }}
        >
          &gt;
        </NavLink>
      </nav>
    );
  }
}

export default Pagination;
