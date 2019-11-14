/**
 * @fileoverview Common Date Renderer used in lists
 * @author Marc Mathieu
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  cellFormatters,
} from '@codeparticle/whitelabelwallet.styleguide';

const { Text } = cellFormatters;

function DateRenderer({ data }) {
  const formattedDate = `${moment(data.created_date).format('MM/DD/YY')} at ${moment(data.created_date).format('h:mm a')}`;

  return (
    <Text value={formattedDate} />
  );
}

DateRenderer.propTypes = {
  data: PropTypes.object.isRequired,
};

export { DateRenderer };
