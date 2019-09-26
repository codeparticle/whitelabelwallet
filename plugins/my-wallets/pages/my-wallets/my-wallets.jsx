import React,  { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { HeaderButton, IconButton, svgs, useMedia } from '@codeparticle/whitelabelwallet.styleguide';
import { Visible } from '@codeparticle/react-visible';
import { Page } from 'components';
import { VARIANTS } from 'lib/constants';
import { useManager } from 'lib/hooks';
import { fetchWallets } from 'plugins/my-wallets/helpers';
import { setWallets } from 'plugins/my-wallets/rdx/actions';
import { getWallets } from 'plugins/my-wallets/rdx/selectors';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { WalletSidepanel, Wallets } from 'plugins/my-wallets/components';

const { PRIMARY } = VARIANTS;
const { SvgAdd, SvgWallet } = svgs.icons;

import './my-wallets.scss';

/**
  Renders My Wallet Page
  @returns {Node} - rendered My Wallet Page
*/
const MyWallets = ({
  history,
  intl: {
    formatMessage,
  },
  wallets,
  ...props
}) => {
  const [isOpenValue, setIsOpenValue] = useState(false);
  const manager = useManager();
  const { isMobile } = useMedia();

  useEffect(() => {
    fetchWallets(manager, props.setWallets);
  }, [props.setWallets]);

  const onClose = (eventData)=> {
    if (eventData === undefined || !eventData.outsideClick || !isMobile) {
      setIsOpenValue(false);
    }
  };

  const onClick = () => setIsOpenValue(true);

  const AddWallet = () => (
    <HeaderButton
      label={formatMessage(MY_WALLETS.ADD_WALLET_BUTTON_LABEL)}
      Icon={SvgAdd}
      onClick={onClick}
    />
  );
  const AddWalletIcon = ({ collapsed, iconProps }) => (
    <Visible when={collapsed}>
      <IconButton onClick={onClick} icon={<SvgAdd {...iconProps} />} />
    </Visible>
  );

  return (
    <Page
      headerProps={{
        PrimaryAction: AddWalletIcon,
        Icon: SvgWallet,
        SecondaryAction: AddWallet,
        title: formatMessage(MY_WALLETS.PAGE_HEADER),
        type: PRIMARY,
      }}
      sidepanel={
        <WalletSidepanel
          onClose={onClose}
          intl
          isOpen={isOpenValue}
          setWallets={props.setWallets}
        />
      }
    >
      <Wallets history={history} wallets={wallets} />
    </Page>
  );
};

MyWallets.propTypes = {
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  setWallets: PropTypes.func.isRequired,
  wallets: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const wallets = getWallets(state);

  return {
    wallets,
  };
};

const mapDispatchToProps = {
  setWallets,
};

const MyWalletsPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(MyWallets));

export { MyWalletsPage };
