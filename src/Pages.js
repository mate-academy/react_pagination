import React from 'react';
import { ShapePages } from './Shapes/Shapes';

export const Pages = ({ links, changePage }) => (
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

Pages.propTypes = ShapePages.isRequired;
