import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Page } from 'components';
import { VARIANTS } from 'lib/constants';

const { SECONDARY } = VARIANTS;

const ReceiveFundsView = ({ match }) => {

  function getHeaderProps() {
    const headerProps = {
      title: 'Receive Funds Page',
    };

    match.params.address
      ? headerProps.type = SECONDARY
      : null;

    return headerProps;
  }

  return (
    <Page headerProps={getHeaderProps()} />
  );
};

ReceiveFundsView.propTypes = {
  match: PropTypes.object.isRequired,
};


const ReceiveFundsPage =  withRouter(ReceiveFundsView);
export { ReceiveFundsPage };
