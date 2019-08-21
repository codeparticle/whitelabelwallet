import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { TRANSLATION_KEYS } from 'translations/keys';
import { useFetch } from 'lib/utils/rest-hooks';
import { Wallets, HeaderButtonGroup } from '../components';

import './my-wallets.scss';

const { WALLETS } = TRANSLATION_KEYS;

/**
  @typedef MyWalletsProps
  @type {Object}
  @property {Object} intl
*/

/**
  Renders My Wallet Page
  @param {MyWalletsProps} props
  @returns {Node} - rendered My Wallet Page
*/
const MyWallets = ({ intl: { formatMessage } }) => {
  const {
    payload: {
      data: wallets = [],
    },
  } = useFetch({}, 'wallets');

const MyWallets = () => {
  return (
    <div>
      My Wallets Page
    </div>
  );
};

MyWallets.propTypes = {
  intl: PropTypes.func.isRequired,
};

MyWallets.propTypes = {
  intl: intlShape.isRequired,
};

const MyWalletsPage = injectIntl(MyWallets);

export { MyWalletsPage };
