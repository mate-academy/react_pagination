import React from 'react';
import { useRouteMatch } from 'react-router';

export const Page = () => {
  const match = useRouteMatch();

  return (
    <div className="container">
      <h1>
        Page
        {' '}
        {match.params.page}
      </h1>
    </div>
  );
};
