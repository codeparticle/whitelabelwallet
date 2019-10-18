import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router';
import { Page } from 'components';
import { VARIANTS } from 'lib/constants';

import { ReceiveFundsLayout } from 'plugins/receive-funds/components';
import { RECEIVE_FUNDS } from 'plugins/receive-funds/translations/keys';

const { TITLE } = RECEIVE_FUNDS;
const { SECONDARY } = VARIANTS;

const pageStyles = {
  height: '100%',
  maxHeight: '100%',
  padding: 0,
};

function ReceiveFundsView({
  intl,
  match,
}) {
  const { formatMessage } = intl;

  function getHeaderProps() {
    const headerProps = {
      title: formatMessage(TITLE),
    };

    match.params.address
      ? headerProps.type = SECONDARY
      : null;

    return headerProps;
  }

  return (
    <Page headerProps={getHeaderProps()} contentStyles={pageStyles}>
      <ReceiveFundsLayout formatMessage={formatMessage} />
    </Page>
  );
};

ReceiveFundsView.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
};

const ReceiveFundsPage =  injectIntl(withRouter(ReceiveFundsView));

export { ReceiveFundsPage };
