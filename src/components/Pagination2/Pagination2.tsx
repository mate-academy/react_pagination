import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pagination2.scss';

type Props = {
  first: number,
  precurrent: number,
  current: number,
  postcurrent: number,
  last: number,
  isFirstVisible: boolean,
  isPrecurrentVisible: boolean,
  isPostcurrentVisible: boolean,
  isPrecurrentFreeSpaceVisible: boolean,
  isPostcurrentFreeSpaceVisible: boolean,
  isLastVisible: boolean,
  selectPage: (selectedPage: number) => void,
  moveBack: () => void,
  moveForth: () => void,
};

const Pagination2: React.FC<Props> = ({
  first,
  precurrent,
  current,
  postcurrent,
  last,
  isFirstVisible,
  isPrecurrentVisible,
  isPostcurrentVisible,
  isPrecurrentFreeSpaceVisible,
  isPostcurrentFreeSpaceVisible,
  isLastVisible,
  selectPage,
  moveBack,
  moveForth,
}) => {
  return (
    <nav className="PagesContainer">
      <NavLink
        className="PageLink VersionTwoButton Back"
        to={`/page=${current - 1}`}
        onClick={moveBack}
        style={{
          pointerEvents: (current === first) ? 'none' : 'auto',
        }}
      >
        &lt;
      </NavLink>
      <ul
        className="PagesPanel"
      >
        <li
          className="ItemPage"
          hidden={!isFirstVisible}
        >
          <NavLink
            className="PageLink"
            to={`/page=${first}`}
            onClick={() => {
              selectPage(first);
            }}
          >
            {first}
          </NavLink>
        </li>
        <li
          className="FreeSpace"
          hidden={!isPrecurrentFreeSpaceVisible}
        >
          ...
        </li>
        <li
          className="ItemPage"
          hidden={!isPrecurrentVisible}
        >
          <NavLink
            className="PageLink"
            to={`/page=${precurrent}`}
            onClick={() => {
              selectPage(precurrent);
            }}
          >
            {precurrent}
          </NavLink>
        </li>
        <li
          className="ItemPage"
        >
          <NavLink
            className="PageLink"
            to={`/page=${current}`}
            onClick={() => {
              selectPage(current);
            }}
          >
            {`[${current}]`}
          </NavLink>
        </li>
        <li
          className="ItemPage"
          hidden={!isPostcurrentVisible}
        >
          <NavLink
            className="PageLink"
            to={`/page=${postcurrent}`}
            onClick={() => {
              selectPage(postcurrent);
            }}
          >
            {postcurrent}
          </NavLink>
        </li>
        <li
          className="FreeSpace"
          hidden={!isPostcurrentFreeSpaceVisible}
        >
          ...
        </li>
        <li
          className="ItemPage"
          hidden={!isLastVisible}
        >
          <NavLink
            className="PageLink"
            to={`/page=${last}`}
            onClick={() => {
              selectPage(last);
            }}
          >
            {last}
          </NavLink>
        </li>
      </ul>
      <NavLink
        className="PageLink VersionTwoButton Forth"
        to={`/page=${current + 1}`}
        onClick={moveForth}
        style={{
          pointerEvents: (current === last) ? 'none' : 'auto',
        }}
      >
        &gt;
      </NavLink>
    </nav>
  );
};

export default Pagination2;
