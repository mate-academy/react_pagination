import React from 'react';

import './App.css';

// no-extraneous-dependencies
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';

import postersFromServer from './api/posters.json';

import { PostersList } from './components/PostersList';
import { Paginator } from './components/Paginator';

class App extends React.Component {
  state = {
    posters: postersFromServer,
    total: postersFromServer.length,
    perPage: 3,
    currentPage: 1,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (value === '...') {
      return;
    }

    const postersLimit = postersFromServer.length;

    this.setState(() => {
      let validValue = +value;

      if (name === 'total') {
        validValue = +value > postersLimit ? postersLimit : +value;
      }

      return {
        [name]: validValue || 1,
      };
    });

    if (['perPage', 'total'].includes(name)) {
      this.setState({
        currentPage: 1,
      });
    }
  }

  displayCurrentPstersCount = (
    initialPosterNumber,
    lastPoster,
    postersLimitCount,
  ) => {
    if (initialPosterNumber === postersLimitCount) {
      return `${initialPosterNumber} of ${postersLimitCount}`;
    }

    const validLastPosterNumber = lastPoster > postersLimitCount
      ? postersLimitCount
      : lastPoster;

    return `
    ${initialPosterNumber} - ${validLastPosterNumber} of ${postersLimitCount}
    `;
  }

  render() {
    const { posters, total, perPage, currentPage } = this.state;
    const startIndex = currentPage * perPage - perPage;
    const stopIndex = currentPage * perPage;

    const requestedPosters = posters.slice(0, total);
    const postersForDisplay = requestedPosters.slice(startIndex, stopIndex);

    return (
      <>

        <div className="App">
          <header className="header">

            <FormControl
              variant="outlined"
              style={{
                marginRight: '30px',
                width: '150px',
              }}
            >
              <InputLabel
                id="demo-simple-select-outlined-label"
              >
                Posters Per Page
              </InputLabel>

              <Select
                name="perPage"
                id="demo-simple-select-outlined"
                value={perPage}
                onChange={this.handleChange}
                label="posters Per Page"
              >
                {
                  [3, 6, 12, 24, 45].map(item => (
                    <MenuItem key={item} value={item}>
                      {' '}
                      {item}
                      {' '}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              name="total"
              label="Outlined"
              variant="outlined"
              value={total}
              onChange={this.handleChange}
            />
          </header>

          <PostersList posters={postersForDisplay} />

          <p
            className="current-posters"
          >
            {
              this.displayCurrentPstersCount(
                startIndex + 1,
                stopIndex,
                requestedPosters.length,
              )
            }

          </p>
          <Paginator
            total={total}
            perPage={perPage}
            currentPage={currentPage}
            handleChange={this.handleChange}
          />
        </div>
      </>
    );
  }
}

export default App;
