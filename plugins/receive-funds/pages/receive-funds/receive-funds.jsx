import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router';
import { Page } from 'components';

import { VARIANTS } from 'lib/constants';
import { THEME_KEYS, useMedia, useTheme } from '@codeparticle/whitelabelwallet.styleguide';
import { cloud } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';

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
  const [headerProps, setHeaderProps] = useState(null);
  const themeName = useTheme('name');
  const { isMobile } = useMedia();
  const mobileBackground = themeName === THEME_KEYS.LIGHT
    ? cloud
    : null;
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

  function updateHeaderProps(values) {
    if (values) {
      setHeaderProps({
        ...getHeaderProps(),
        ...values,
      });
    } else {
      setHeaderProps(getHeaderProps());
    }
  }

  return (
    <Page
      background={isMobile ? mobileBackground : null}
      contentStyles={pageStyles}
      headerProps={headerProps || getHeaderProps()}
    >
      <ReceiveFundsLayout formatMessage={formatMessage} updateHeaderProps={updateHeaderProps} />
    </Page>
  );
};

ReceiveFundsView.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.object.isRequired,
};

const ReceiveFundsPage =  injectIntl(withRouter(ReceiveFundsView));

export { ReceiveFundsPage };
