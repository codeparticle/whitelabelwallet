import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Page } from 'components';
import { VARIANTS } from 'lib/constants';

const { PRIMARY, SECONDARY } = VARIANTS;

const ReceiveFundsView = ({ match }) => {
  // const headerType = match.url.includes('secondary-page') ? SECONDARY : PRIMARY;
  return (
    <Page headerProps={{
      title: 'Receive Funds Page',
    }} />
  );
};

ReceiveFundsView.propTypes = {
  match: PropTypes.object.isRequired,
};


const ReceiveFundsPage =  withRouter(ReceiveFundsView);
export { ReceiveFundsPage };
