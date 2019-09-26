import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  cellFormatters,
} from '@codeparticle/whitelabelwallet.styleguide';

const { Text } = cellFormatters;

function CustomDateRenderer({ data }) {
  const formattedDate = `${moment(data.created_date).format('MM/DD/YY')} at ${moment(data.created_date).format('h:mm a')}`;

  return (
    <Text value={formattedDate} />
  );
}

CustomDateRenderer.propTypes = {
  data: PropTypes.object.isRequired,
};

export { CustomDateRenderer };