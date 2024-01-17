import { Link } from '../components/Link';

export function createLinksList(amount: number,
  activePage: number,
  onClickCallBack: (pageNumber: number) => void) {
  const linksList = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < amount; i++) {
    linksList.push((
      <Link
        key={i + 1}
        href={i + 1}
        isActive={activePage === i + 1}
        onClickCallBack={onClickCallBack}
      />
    ));
  }

  return linksList;
}
