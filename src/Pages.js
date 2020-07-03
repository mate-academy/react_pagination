import React from 'react';
import { makeLinks } from './MakeLinks';
import { ShapePages } from './Shapes/Shapes';

export const Pages = ({ changePage, page, length, perPage, direction }) => {
  const links = makeLinks(+page, Math.ceil(length / perPage), direction);

  if (links[2] !== links[1] + 1 && links.length === 3) {
    links.splice(2, 0, '...');
  }

  return (
    <ul className="pages">
      {
        links.map((link, i) => {
          if (i === 2 && links.length === 4) {
            return (
              <li key={link} className="page">
                <p>...</p>
              </li>
            );
          }

          return (
            <li className="page" key={link}>
              <a
                className="page_link"
                href="#!"
                onClick={() => changePage(link)}
              >
                {link}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};

Pages.propTypes = ShapePages.isRequired;
