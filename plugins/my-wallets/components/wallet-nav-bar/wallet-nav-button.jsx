/**
 * @fileoverview Wallet Nav Bar Button Component
 * @author Marc Mathieu
 */

import React from 'react';
import PropTypes from 'prop-types';

function WalletNavBarButton({
  categoryLabel,
  icon,
  onClick,
}) {

  return (
    <button onClick={onClick} className="nav-button">
      {icon}
      <div className="category-wrapper">
        <p className="nav-item-category">{categoryLabel}</p>
      </div>
    </button>
  );
}

WalletNavBarButton.propTypes = {
  categoryLabel: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick:PropTypes.func.isRequired,
};

export { WalletNavBarButton };