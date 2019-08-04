import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Pagination from './pagination/Pagination';

const PageWithPagination = ({ history, match }) => {
  const tabs = [
    { id: 1, title: 'Tab 1', content: 'Some text 1' },
    { id: 2, title: 'Tab 2', content: 'Some text 2' },
    { id: 3, title: 'Tab 3', content: 'Some text 3' },
    { id: 4, title: 'Tab 4', content: 'Some text 4' },
    { id: 5, title: 'Tab 5', content: 'Some text 5' },
    { id: 6, title: 'Tab 6', content: 'Some text 6' },
    { id: 7, title: 'Tab 7', content: 'Some text 7' },
    { id: 8, title: 'Tab 8', content: 'Some text 8' },
    { id: 9, title: 'Tab 9', content: 'Some text 9' },
    { id: 10, title: 'Tab 10', content: 'Some text 10' },
    { id: 11, title: 'Tab 11', content: 'Some text 11' },
    { id: 12, title: 'Tab 12', content: 'Some text 12' },
    { id: 13, title: 'Tab 13', content: 'Some text 13' },
    { id: 14, title: 'Tab 14', content: 'Some text 14' },
    { id: 15, title: 'Tab 15', content: 'Some text 15' },
    { id: 16, title: 'Tab 16', content: 'Some text 16' },
    { id: 17, title: 'Tab 17', content: 'Some text 17' },
    { id: 18, title: 'Tab 18', content: 'Some text 18' },
    { id: 19, title: 'Tab 19', content: 'Some text 19' },
    { id: 20, title: 'Tab 20', content: 'Some text 20' },
    { id: 21, title: 'Tab 21', content: 'Some text 21' },
    { id: 22, title: 'Tab 22', content: 'Some text 22' },
  ];
  const { perPage, page } = match.params;
  const { path } = match;
  const url = path.split(':')[0];

  const lastIndex = +page * +perPage;
  const startIndex = lastIndex - +perPage;
  const currentPage = tabs.slice(startIndex, lastIndex);

  return (
    <div className="App">
      <h1>
        Tabs
      </h1>

      <List currentPage={currentPage} />

      <Pagination
        total={tabs.length}
        perPage={+perPage}
        page={+page}
        history={history}
        url={url}
        withInfo
        shortcut
      />
    </div>
  );
};

PageWithPagination.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      page: PropTypes.string,
      perPage: PropTypes.string,
    }),
  }).isRequired,
};

export default PageWithPagination;
