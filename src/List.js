import React from 'react';

const List = ({ page, perPage, content }) => {
  const currentContent = content.slice((page - 1) * perPage, perPage * page);

  return (
    <ul>
      {currentContent.map(item => (
        <li className="item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
