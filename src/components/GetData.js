/* eslint-disable */
import React from 'react';

const GetData = async(url) => {
  const responce = await fetch(url);
  const json = await responce.json();

  return json;
};

export default GetData;
