/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      <h1>Not Found Page</h1>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
};
