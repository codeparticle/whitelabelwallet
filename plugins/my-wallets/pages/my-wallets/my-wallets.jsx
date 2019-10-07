import React,  { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { HeaderButton, IconButton, svgs, useMedia } from '@codeparticle/whitelabelwallet.styleguide';
import { Visible } from '@codeparticle/react-visible';
import { Page } from 'components';
import { VARIANTS } from 'lib/constants';
import { empty } from 'lib/utils';
import { fetchWallets } from 'plugins/my-wallets/helpers';
import { setWallets, clearSelectedWalletTransactions } from 'plugins/my-wallets/rdx/actions';
import { getWallets } from 'plugins/my-wallets/rdx/selectors';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { WalletSidepanel, Wallets } from 'plugins/my-wallets/components';
import { myWallets as e2e } from 'e2e/constants';

const { PRIMARY } = VARIANTS;
const { SvgMagnifyingGlass, SvgWallet, SvgAdd } = svgs.icons;

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
  const { isMobile } = useMedia();

  useEffect(() => {
    fetchWallets(props.setWallets);
  }, [props.setWallets]);

  const onClose = (eventData)=> {
    if (eventData === undefined || !eventData.outsideClick || !isMobile) {
      setIsOpenValue(false);
    }
  };

  const onClick = () => setIsOpenValue(true);
  const handleWalletClick = () => props.clearSelectedWalletTransactions();

  const AddWallet = () => (
    <HeaderButton
      label={formatMessage(MY_WALLETS.ADD_WALLET_BUTTON_LABEL)}
      Icon={SvgAdd}
      onClick={onClick}
    />
  );
  const SearchWalletsIcon = ({ collapsed, iconProps }) => (
    <Visible when={collapsed}>
      <IconButton onClick={empty} icon={<SvgMagnifyingGlass {...iconProps} />} />
    </Visible>
  );

  return (
    <Page
      dataSelector={e2e.selectors.page.raw}
      onAddClicked={onClick}
      headerProps={{
        PrimaryAction: SearchWalletsIcon,
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
      <Wallets history={history} wallets={wallets} handleWalletClick={handleWalletClick} />
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
  clearSelectedWalletTransactions,
  setWallets,
};

const MyWalletsPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(MyWallets));

export { MyWalletsPage };
