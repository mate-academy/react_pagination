import React from 'react';
import TableCard from './TableCard';
import Pagination from './Pagination';
import './App.css';
import source from './source';

const elements = source.map((elem, i) => (
  { ...elem, id: i + 1 }
));

class CustomizedTables extends React.Component {
  state = {
    total: 0,
    perPage: 20,
    page: 1,
    items: [],
  }

  componentDidMount() {
    this.setState({
      total: elements.length,
      items: elements,
    });
  }

  setAmountRows = (items, itemsPerPage, page) => {
    const maxValue = page * itemsPerPage;
    const AmountRows = items.slice(maxValue - itemsPerPage, maxValue);

    return AmountRows;
  };

  setActivePage = (currentPage) => {
    this.setState({
      page: currentPage,
    });
  }

  changeRowsPerPage = (pageCount) => {
    this.setState({
      perPage: pageCount,
      page: 1,
    });
  };

  totalPages = (rowsPerPage, allRows) => (
    Math.ceil(allRows / rowsPerPage)
  );

  render() {
    const {
      total,
      perPage,
      page,
      items,
    } = this.state;
    const totalPages = this.totalPages(perPage, total);
    const visibleRows = this.setAmountRows(items, perPage, page);

    return (
      <>
        <TableCard visibleRows={visibleRows} />
        <Pagination
          visibleRows={visibleRows}
          total={totalPages}
          totalRows={total}
          perPage={perPage}
          page={page}
          setActivePage={this.setActivePage}
          changeRowsPerPage={this.changeRowsPerPage}
        />

      </>

    );
  }
}

export default CustomizedTables;
