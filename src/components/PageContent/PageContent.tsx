import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PageContent.scss';

const PageContent: React.FC = () => {
  const [
    queryParams,
    setQueryParams,
  ] = useState('/');

  const { currentPage } = useParams();

  useMemo(() => {
    if (currentPage) {
      setQueryParams(currentPage);
    }
  }, [currentPage]);

  return (
    <>
      <p className="PageInformation">
        {(queryParams === '/') ? '/page=1' : queryParams}
      </p>
    </>
  );
};

export default PageContent;
