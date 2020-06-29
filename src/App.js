/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import Posts from './api/posts';

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const perPage = searchParams.get('perPage') || 50;
  const page = searchParams.get('page') || 1;
  const lastIndex = +perPage * page;
  const startIndex = +perPage * (page - 1);
  const posts = Posts.slice(startIndex, lastIndex);
  const links = [];

  for (let i = 0; i < Posts.length / +perPage; i++) {
    links.push(i + 1);
  }

  const changePage = (link) => {
    searchParams.set('perPage', perPage);
    searchParams.set('page', link);
    history.push({
      search: searchParams.toString(),
    });
  };
  console.log('www', [...searchParams.entries()], location, 'outside');

  return (
    <div>
      <select
        value={perPage}
        onChange={(ev) => {
          console.log(page);
          if (+page > Posts.length / ev.target.value) {
            console.log('fff');
            searchParams.set('page', Posts.length / ev.target.value);
            searchParams.set('perPage', ev.target.value);
            history.push({
              search: searchParams.toString(),
            });
          }
          else {
            searchParams.set('perPage', ev.target.value);
            history.push({
              search: searchParams.toString(),
            });
          }
        }}
      >

        <option>100</option>
        <option>50</option>
        <option>20</option>
        <option>10</option>
      </select>
      <ul className="posts">
        {
          posts.map((post, i) => {
            return (
              <li className="post">
                <h4>{(i + 1 + (perPage * (page - 1)))}</h4>
                <p>{post.title}</p>
              </li>
            );
          })
        }
      </ul>
      <ul>
        {
          links.map((link) => {
            return (
              <li>
                <a
                  href=""
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

export default App;
