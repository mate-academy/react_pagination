import React from 'react';
import { getAmountOfItems } from '../../utils';

type Props = {
  page: string;
  amountOfItems: string;
  items: string[];
  onDataSubmit: (element: string[]) => void;
};

export const ShowItems: React.FC<Props> = ({
  page,
  items,
  amountOfItems,
  onDataSubmit,
}) => {
  const currentAmountOfItems = getAmountOfItems(items, page, amountOfItems);

  console.log('currentAmountOfItems:', currentAmountOfItems);

  const handleClick = () => {
    onDataSubmit(currentAmountOfItems); // why currentAmountOfItems is not passed to parent component?
  };

  const elements = currentAmountOfItems.map(item => (
    <li onClick={handleClick} key={item} data-cy="item">
      {item}
    </li>
  ));

  return <ul>{elements}</ul>;
};
