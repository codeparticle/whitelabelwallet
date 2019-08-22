import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { Page } from 'components';
import { empty } from 'lib/utils';

import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { Wallets } from 'plugins/my-wallets/components';

import './my-wallets.scss';

/**
  Renders My Wallet Page
  @returns {Node} - rendered My Wallet Page
*/
const MyWallets = ({
  intl: {
    formatMessage,
  },
}) => {
  // Load wallets from local DB
  const wallets = [];
  const actionButtons = (
    <Button
      onClick={empty}
      variant="primary"
      size="sm"
    >
      {formatMessage(MY_WALLETS.ADD_WALLET_BUTTON_LABEL)}
    </Button>
  );

  return (
    <Page
      headerProps={{
        actionButtons,
        title: MY_WALLETS.PAGE_HEADER,
      }}
    >
      <Wallets wallets={wallets} />
    </Page>
  );
};

MyWallets.propTypes = {
  intl: intlShape.isRequired,
};

const MyWalletsPage = injectIntl(MyWallets);

export { MyWalletsPage };
