import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

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

MyWallets.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
});

const MyWalletsPage = connect(stateMapper, actionsMapper)(MyWallets);

export { MyWalletsPage };
