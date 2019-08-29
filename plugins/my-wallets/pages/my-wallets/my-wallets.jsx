import React,  { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Icon, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { Visible } from '@codeparticle/react-visible';
import { HeaderButton, Page } from 'components';
import { clearData } from 'plugins/my-wallets/rdx/actions';
import { empty } from 'lib/utils';

import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { Sidepanel, Wallets } from 'plugins/my-wallets/components';

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
  clearData,
}) => {
  // Load wallets from local DB
  const wallets = [];
  const isOpen = false;
  const onClose = ()=> {
    setIsOpenValue(false);
    clearData();
  };
  const [isOpenValue, setIsOpenValue] = useState(isOpen);
  const AddWallet = () => (
    <HeaderButton
      label={formatMessage(MY_WALLETS.ADD_WALLET_BUTTON_LABEL)}
      Icon={SvgAdd}
      onClick={() => setIsOpenValue(true)}
    />
  );
  const sidepanelTranslations = {
    generateButton: formatMessage(MY_WALLETS.GENERATE_CODE_BUTTON),
    continueButton: formatMessage(MY_WALLETS.CONTINUE_BUTTON),
    keepSecret: formatMessage(MY_WALLETS.KEEP_SECRET_TEXT),
    multiAddressLabel: formatMessage(MY_WALLETS.MULTI_ADDRESS_LABEL),
    newWalletTitle: formatMessage(MY_WALLETS.NEW_WALLET_TITLE),
    newWalletSubTitle: formatMessage(MY_WALLETS.NEW_WALLET_SUB_TITLE),
    recoveryCode: formatMessage(MY_WALLETS.RECOVERY_CODE_BUTTON),
    walletNickname: formatMessage(MY_WALLETS.WALLET_NICKNAME_LABEL),
    walletPlaceholder: formatMessage(MY_WALLETS.WALLET_PLACEHOLDER),
  };

  return (
    <Page
      headerProps={{
        PrimaryAction: AddWalletIcon,
        SecondaryAction: AddWallet,
        title: formatMessage(MY_WALLETS.PAGE_HEADER),
      }}
    >
      <Wallets wallets={wallets} />
      <Sidepanel
        onClose={onClose}
        translations={sidepanelTranslations}
        isOpen={isOpenValue} />
    </Page>
  );
};

MyWallets.propTypes = {
  intl: intlShape.isRequired,
  clearData: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  clearData,
};

const MyWalletsPage = connect(null, mapDispatchToProps)(injectIntl(MyWallets));

export { MyWalletsPage };
