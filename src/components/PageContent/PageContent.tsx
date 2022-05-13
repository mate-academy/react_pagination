import React, { useMemo, useState } from 'react';
import './PageContent.scss';

const PageContent: React.FC = () => {
  const [
    queryParams,
    setQueryParams,
  ] = useState('');

  useMemo(() => {
    setQueryParams(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <>
      <p className="PageInformation">
        {(queryParams === '/') ? '/page=1' : queryParams}
      </p>
    </>
  );
};

export default PageContent;
