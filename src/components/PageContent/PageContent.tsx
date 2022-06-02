import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PageContent.scss';

type PageContentProps = {
  total: number,
  perPage: number,
};

const PageContent: React.FC<PageContentProps> = ({
  total,
  perPage,
}) => {
  const [
    firstDisplayedItem,
    setFirstDisplayedItem,
  ] = useState(1);

  const [
    lastDisplayedItem,
    setLastDisplayedItem,
  ] = useState(perPage);

  const { currentPage } = useParams();

  useMemo(() => {
    if (currentPage) {
      const firstItem = (+currentPage.slice(5) - 1) * perPage + 1;

      setFirstDisplayedItem(firstItem);

      if (total < firstItem + perPage - 1) {
        setLastDisplayedItem(total);
      } else {
        setLastDisplayedItem(firstItem + perPage - 1);
      }
    }
  }, [currentPage]);

  return (
    <>
      <p className="PageInformation">
        {`Item_${firstDisplayedItem} - Item_${lastDisplayedItem}`}
      </p>
    </>
  );
};

export default PageContent;
