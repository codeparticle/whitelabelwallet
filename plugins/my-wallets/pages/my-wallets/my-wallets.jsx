import React,  { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { HeaderButton, IconButton, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { Visible } from '@codeparticle/react-visible';
import { Page } from 'components';
import { empty } from 'lib/utils';
import { useManager } from 'lib/hooks';
import { setWallets } from 'plugins/my-wallets/rdx/actions';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { WalletSidepanel, Wallets } from 'plugins/my-wallets/components';

const { SvgAdd } = svgs.icons;

import './my-wallets.scss';

const AddWalletIcon = ({ collapsed, iconProps }) => (
  <Visible when={collapsed}>
    <IconButton onClick={empty} icon={<SvgAdd {...iconProps} />} />
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
  const onClose = ()=> {
    setIsOpenValue(false);
  };
  const [isOpenValue, setIsOpenValue] = useState(false);
  const AddWallet = () => (
    <HeaderButton
      label={formatMessage(MY_WALLETS.ADD_WALLET_BUTTON_LABEL)}
      Icon={SvgAdd}
      onClick={() => setIsOpenValue(true)}
    />
  );
  const manager = useManager();

  return (
    <Page
      headerProps={{
        PrimaryAction: AddWalletIcon,
        SecondaryAction: AddWallet,
        title: formatMessage(MY_WALLETS.PAGE_HEADER),
      }}
    >
      <Wallets wallets={wallets} />
      <WalletSidepanel
        onClose={onClose}
        intl
        isOpen={isOpenValue}
        manager={manager}
        setIsOpenValue={setIsOpenValue}
        setWallets={setWallets}/>
    </Page>
  );
};

MyWallets.propTypes = {
  intl: intlShape.isRequired,
  setWallets: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setWallets,
};

const MyWalletsPage = connect(null, mapDispatchToProps)(injectIntl(MyWallets));

export { MyWalletsPage };
