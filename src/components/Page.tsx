import { useSearchParams } from 'react-router-dom';

export const Page: React.FC = () => {
  const [queryParams] = useSearchParams();
  const pageNum = queryParams.get('page');

  return (
    <>
      <h2>{`Page number: ${pageNum}`}</h2>
      <p>{`queryParams: ${queryParams}`}</p>
    </>
  );
};
