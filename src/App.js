/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import Posts from './api/posts';
import { nominalTypeHack } from 'prop-types';
let linksDirection = 'right';
const App = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const perPage = searchParams.get('perPage') || 50;
  const page = searchParams.get('page') || 1;
  const lastIndex = +perPage * page;
  const startIndex = +perPage * (page - 1);
  const posts = Posts.slice(startIndex, lastIndex);
  let links = generateLink(+page, Math.ceil(Posts.length / perPage), linksDirection);

  if (links[2] !== links[1] + 1 && links.length === 3) {
    links.splice(2, 0, "sss");
  }

  console.log(links, 'sssss')
  const changePage = (link) => {
    if (linksDirection === 'left' && link === +page - 1) {
      linksDirection = 'left';
    } else {
      linksDirection = (link <= +page && linksDirection !== 'left') ? 'left' : 'right';
    }


    console.log('page',+page,'link', link, 'test', linksDirection, link===+page);
    searchParams.set('perPage', perPage);
    searchParams.set('page', link);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <div className="container">
      <select
        value={perPage}
        onChange={(ev) => {
          if (+page > Posts.length / ev.target.value) {
            searchParams.set('page', Posts.length / ev.target.value);
            searchParams.set('perPage', ev.target.value);
            history.push({
              search: searchParams.toString(),
            });
          } else {
            searchParams.set('perPage', ev.target.value);
            history.push({
              search: searchParams.toString(),
            });
          }
        }}
      >
        <option>100</option>
        <option>50</option>
        <option>15</option>
        <option>10</option>
      </select>
      <h3>{`Total number of posts per this page ${posts.length}`}</h3>
      <ul className="posts">
        {
          posts.map((post, i) => {
            return (
              <li className="post">
                <h4>{(i + 1 + (perPage * (page - 1))) + '.'}</h4>
                <p>{post.title}</p>
              </li>
            );
          })
        }
      </ul>
      <ul className="pages">
        {
          links.map((link, i) => {
            console.log(links.length);
            if (i === 2 && links.length === 4) {
              return (
                <li className="page">
                  <p>...</p>
                </li>
              );
            }

            return (
              <li className="page">
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

    </div>
  );
};

function generateLink(current, last, direction) {
  console.log(last, "bsshbwkuhb");
  if (last < 4) {
    const links = [];

    for (let i = 1; i <= last; i++) {
      links.push(i);
    }

    return links;
  }

  if (+current >= last - 1) {
    return [last - 2, last - 1, last];
  }

  if (direction === 'right') {
    return [+current, +current + 1, last];
  }

  if (current <= 2) {
    return [1, 2, last];
  }

  return [current - 1, current, last];
}

export default App;
