import React from 'react';

import PropTypes from 'prop-types';

let _ = require('lodash');
const classNames = require('classnames');

const Navigation = ({
  arrPages,
  page,
  state: {
    withInfo,
    changedView,
  },
  togglePages,
}) => (
  <>
    {
      arrPages.map((pagen, index) => (
        changedView
          ? (
            <>
              {
                index === 0 && (
                  <li
                    className={
                      classNames('page-item', 'item',
                        { active: index === page })
                    }
                    key={_.uniqueId('key_')}
                  >
                    <input
                      onClick={() => togglePages(index)}
                      className="page-link"
                      value={index + 1}
                    />
                    {withInfo && <div className="addInfo">{pagen.additionalInfo}</div>}
                  </li>
                )
              }

              {
                index === page - 2
                  && arrPages.length > 3
                  && index !== 0
                  && <p>...</p>
              }

              {
                (index === page
                  || index === page - 1
                  || index === page + 1)
                    && (index !== 0 && index !== arrPages.length - 1)
                  && (
                    <li
                      className={classNames('page-item', 'item',
                        { active: index === page })
                      }
                      key={_.uniqueId('key_')}
                    >
                      <input
                        onClick={() => togglePages(index)}
                        className="page-link"
                        value={index + 1}
                      />
                      {withInfo && <div className="addInfo">{pagen.additionalInfo}</div>}
                    </li>
                  )
              }

              {
                index === page + 2
                  && arrPages.length > 3
                  && index !== arrPages.length - 1
                  &&  <p>...</p>
              }

              {
                index === arrPages.length - 1 && (
                  <li
                    className={classNames('page-item', 'item',
                      { active: index === page })
                    }
                    key={_.uniqueId('key_')}
                  >
                    <input
                      onClick={() => togglePages(index)}
                      className="page-link"
                      value={index + 1}
                    />
                    {withInfo && <div className="addInfo">{pagen.additionalInfo}</div>}
                  </li>
                )
              }
            </>
          )
          : (
            <li
              className={classNames('page-item', 'item',
                { active: index === page })
              }
              key={_.uniqueId('key_')}
            >
              <input
                onClick={() => togglePages(index)}
                className="page-link"
                value={index + 1}
              />
              {withInfo && (
                <div className="addInfo">
                  {pagen.additionalInfo}
                </div>
              )}
            </li>
          )
      ))
    }
  </>
);

Navigation.propTypes = {
  arrPages: PropTypes.arrayOf(
    PropTypes.shape({
      additionalInfo: PropTypes.string,
    }).isRequired,
  ).isRequired,
  page: PropTypes.number.isRequired,
  state: PropTypes.shape({
    withInfo: PropTypes.func,
    changedView: PropTypes.func,
  }).isRequired,
  togglePages: PropTypes.func.isRequired,
};

export default Navigation;
