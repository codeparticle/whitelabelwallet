import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { NavBar, useMedia } from '@codeparticle/whitelabelwallet.styleguide';
import { getRdxSelectionMapper, getRdxActionMapper } from 'rdx/utils/props-mapping';
import './nav-bar-container.scss';

import { common as e2e } from 'e2e/constants';

/**
  @typedef NavBarContainerProps
  @type {Object}
  @param {String} authToken
  @param {Array} plugins
  @param {Object} intl
*/

/**
 * Renders a navigation
 * @param {NavBarContainerProps} props
 * @return {Node} rendered Navigation
 */
const NavBarView = ({
  authToken,
  plugins,
  intl: { formatMessage },
  isMobileNavBarOpen,
  isTabletNavBarOpen,
  toggleMobileNavBar,
}) => {
  const { isMobile } = useMedia();

  if (!authToken) {
    return null;
  }

  // Flattening the main-rouote-link plugin types components property
  const pluginNavComponentProps = (plugins['main-route-link'] || []).reduce((acc, { components }) => acc.concat(components), []);

  const navItems = pluginNavComponentProps.map(item => ({
    ...item,
    label: typeof item.label === 'object' ? formatMessage(item.label) : item.label,
  }));
  const closeMobileNavBar = () => toggleMobileNavBar(false);

  return (
    <NavBar
      dataSelector={e2e.selectors.navBar.raw}
      navItems={navItems}
      isOpen={isMobile ? isMobileNavBarOpen : isTabletNavBarOpen}
      onClose={closeMobileNavBar}
      onNavItemClick={closeMobileNavBar}
    />
  );
};

NavBarView.propTypes = {
  authToken: PropTypes.string,
  intl: intlShape.isRequired,
  isMobileNavBarOpen: PropTypes.bool.isRequired,
  isTabletNavBarOpen: PropTypes.bool.isRequired,
  plugins: PropTypes.object.isRequired,
  toggleMobileNavBar: PropTypes.func.isRequired,
};

const stateMapper = getRdxSelectionMapper({
  authToken: 'getAuthToken',
  isMobileNavBarOpen: 'getIsMobileNavBarOpen',
  isTabletNavBarOpen: 'getIsTabletNavBarOpen',
  plugins: 'getPlugins',
});

const actionsMapper = getRdxActionMapper([
  'toggleMobileNavBar',
]);

const NavBarContainer = connect(stateMapper, actionsMapper)(injectIntl(NavBarView));

export { NavBarContainer };
