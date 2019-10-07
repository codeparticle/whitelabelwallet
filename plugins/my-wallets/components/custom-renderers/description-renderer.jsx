import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function CustomDescriptionRenderer({ data }) {
  const formattedDate = `${moment(data.created_date).format('MM/DD/YY')} at ${moment(data.created_date).format('h:mm a')}`;

  return (
    <div className="description-wrapper">
      <p className="transaction-description">{data.description}</p>
      <p className="transaction-date">{formattedDate}</p>
    </div>
  );
}

CustomDescriptionRenderer.propTypes = {
  data: PropTypes.object.isRequired,
};

export { CustomDescriptionRenderer };