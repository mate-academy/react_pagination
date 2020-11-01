import React from 'react';
import PropTypes from 'prop-types';

export const AppContent = ({ data, currentPage, perPage }) => {
  const startItem = currentPage * perPage;
  const endItem = startItem + perPage;

  const pageContent = data.map(item => (
    <div key={item.id} className="card col-4">
      <div className="card-body">
        <h5 className="card-title text-capitalize">
          {item.title}
        </h5>
        <p className="card-text">
          {item.body}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="row p-5">
      {
        pageContent.slice(startItem, endItem)
      }
    </div>
  );
};

AppContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
