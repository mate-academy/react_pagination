import { useLocation, useParams } from 'react-router-dom';

export const Page: React.FC = () => {
  const location = useLocation();
  const { page } = useParams();

  return (
    <div className="Page">
      <h2>{`Page number: ${page}`}</h2>
      <p>{`queryParams: ${location.search}`}</p>
    </div>
  );
};
