interface Props {
  itemsList: string[];
  perPage: number;
  pageNumber: number;
}

export const Info = ({ itemsList, perPage, pageNumber }: Props) => {
  const maxPages = Math.ceil(itemsList.length / perPage);
  const normlizedPageNumber = Math.max(1, Math.min(pageNumber, maxPages));
  const firstElementId = (normlizedPageNumber - 1) * perPage + 1;
  const lastElementId =
    normlizedPageNumber < maxPages
      ? firstElementId + perPage - 1
      : itemsList.length;
  const infoString = `Page ${normlizedPageNumber} (items ${firstElementId} - ${lastElementId} of ${itemsList.length})`;

  return (
    <p className="lead" data-cy="info">
      {infoString}
    </p>
  );
};
