import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Icon, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { Visible } from '@codeparticle/react-visible';
import { HeaderButton, Page } from 'components';
import { empty } from 'lib/utils';

import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { Wallets } from 'plugins/my-wallets/components';

const { SvgAdd } = svgs.icons;

import './my-wallets.scss';

const AddWalletIcon = ({ collapsed, iconProps }) => (
  <Visible when={collapsed}>
    <Icon onClick={empty} icon={<SvgAdd {...iconProps} />} />
  </Visible>
);

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
  const AddWallet = () => (
    <HeaderButton
      label={formatMessage(MY_WALLETS.ADD_WALLET_BUTTON_LABEL)}
      Icon={SvgAdd}
      onClick={empty}
    />
  );

  return (
    <Page
      headerProps={{
        PrimaryAction: AddWalletIcon,
        SecondaryAction: AddWallet,
        title: formatMessage(MY_WALLETS.PAGE_HEADER),
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
