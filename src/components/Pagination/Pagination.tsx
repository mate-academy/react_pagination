import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  first: number,
  last: number,
  current: number,
  perPage: number,
  total: number,
  withInfo: boolean,
  selectPage: (selectedPage: number) => void,
  moveBack: () => void,
  moveForth: () => void,
};

const Pagination: React.FC <Props> = ({
  first,
  last,
  current,
  perPage,
  total,
  withInfo,
  selectPage,
  moveBack,
  moveForth,
}) => {
  const [precurrent, setPrecurrent] = useState(current - 1);
  const [postcurrent, setPostcurrent] = useState(current + 1);
  const [isFirstVisible, setIsFirstVisible] = useState(false);
  const [isLastVisible, setIsLastVisible] = useState(last > 2);
  const [isPrecurrentVisible, setIsPrecurrentVisible] = useState(false);
  const [isPostcurrentVisible, setIsPostcurrentVisible] = useState(last > 1);
  const [
    isPrecurrentFreeSpaceVisible,
    setIsPrecurrentFreeSpaceVisible,
  ] = useState(false);
  const [
    isPostcurrentFreeSpaceVisible,
    setIsPostcurrentFreeSpaceVisible,
  ] = useState(last > 3);

  const setCurrentNeighboursValues = () => {
    setPrecurrent(current - 1);
    setPostcurrent(current + 1);
  };

  const setVisibleFirstAndCurrentNeighboursValues = () => {
    setCurrentNeighboursValues();
    setIsFirstVisible(true);
  };

  const setParametersForRegularValue = () => {
    setVisibleFirstAndCurrentNeighboursValues();
    setIsLastVisible(true);
    setIsPrecurrentVisible(true);
    setIsPrecurrentFreeSpaceVisible(true);
    setIsPostcurrentVisible(true);
    setIsPostcurrentFreeSpaceVisible(true);
  };

  const setParemetersForValueOne = () => {
    setCurrentNeighboursValues();
    setIsFirstVisible(false);
    setIsLastVisible(last > 2);
    setIsPrecurrentVisible(false);
    setIsPrecurrentFreeSpaceVisible(false);
    setIsPostcurrentVisible(last > 1);
    setIsPostcurrentFreeSpaceVisible(last > 3);
  };

  const setParametersForValueTwo = () => {
    setVisibleFirstAndCurrentNeighboursValues();
    setIsLastVisible(last > 3);
    setIsPrecurrentVisible(false);
    setIsPrecurrentFreeSpaceVisible(false);
    setIsPostcurrentVisible(last > 2);
    setIsPostcurrentFreeSpaceVisible(last > 4);
  };

  const setParametersForValueThree = () => {
    setVisibleFirstAndCurrentNeighboursValues();
    setIsLastVisible(last > 4);
    setIsPrecurrentVisible(true);
    setIsPrecurrentFreeSpaceVisible(false);
    setIsPostcurrentVisible(last > 3);
    setIsPostcurrentFreeSpaceVisible(last > 5);
  };

  const setParametersForLastValue = () => {
    setVisibleFirstAndCurrentNeighboursValues();
    setIsLastVisible(false);
    setIsPrecurrentVisible(true);
    setIsPrecurrentFreeSpaceVisible(true);
    setIsPostcurrentVisible(false);
    setIsPostcurrentFreeSpaceVisible(false);
  };

  const setParametersForSecondValueFromEnd = () => {
    setVisibleFirstAndCurrentNeighboursValues();
    setIsLastVisible(false);
    setIsPrecurrentVisible(true);
    setIsPrecurrentFreeSpaceVisible(last > 4);
    setIsPostcurrentVisible(true);
    setIsPostcurrentFreeSpaceVisible(false);
  };

  const setParametersForThirdValueFromEnd = () => {
    setVisibleFirstAndCurrentNeighboursValues();
    setIsLastVisible(true);
    setIsPrecurrentVisible(true);
    setIsPrecurrentFreeSpaceVisible(true);
    setIsPostcurrentVisible(true);
    setIsPostcurrentFreeSpaceVisible(false);
  };

  const setNewParameters = () => {
    switch (current) {
      case first:
        setParemetersForValueOne();
        break;
      case first + 1:
        setParametersForValueTwo();
        break;
      case first + 2:
        setParametersForValueThree();
        break;
      case last:
        setParametersForLastValue();
        break;
      case last - 1:
        setParametersForSecondValueFromEnd();
        break;
      case last - 2:
        setParametersForThirdValueFromEnd();
        break;
      default:
        setParametersForRegularValue();
    }
  };

  useEffect(() => {
    setNewParameters();
  }, [current, last]);

  return (
    <nav className="PagesContainer">
      <NavLink
        className="PageLink VersionTwoButton Back"
        to={`/page=${current - 1}`}
        onClick={moveBack}
        style={{
          pointerEvents: (current === first)
            ? 'none' : 'auto',
        }}
      >
        &lt;
      </NavLink>

      <span
        className="AdditionalInfo"
        hidden={!withInfo}
      >
        {`
          ${(current - 1) * perPage + 1} - ${(current * perPage) < total ? (current * perPage) : total} of ${total}
        `}
      </span>

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
          pointerEvents: (current === last)
            ? 'none' : 'auto',
        }}
      >
        &gt;
      </NavLink>
    </nav>
  );
};

export default Pagination;
