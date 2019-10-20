import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Visible } from '@codeparticle/react-visible';
import { NavBar, useMedia, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { getRdxSelectionMapper, getRdxActionMapper } from 'rdx/utils/props-mapping';
import { SettingsSidepanel } from 'components';
import { TRANSLATION_KEYS } from 'translations/keys';
import { common as e2e } from 'e2e/constants';
import './nav-bar-container.scss';

const { COMMON: { SETTINGS: SETTINGS_LABEL } } = TRANSLATION_KEYS;
const { SvgSettings } = svgs.icons;

const mobileSettingsLink = (path) => ({
  Icon: SvgSettings,
  label: SETTINGS_LABEL,
  path,
});

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
  location,
  toggleMobileNavBar,
}) => {
  const { isMobile, isLandScape } = useMedia();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettingsPanel = () => setIsSettingsOpen(!isSettingsOpen);

  if (!authToken) {
    return null;
  }

  // Flattening the main-route-link plugin types components property
  const pluginNavComponentProps = (plugins['main-route-link'] || []).reduce((acc, { components }) => acc.concat(components), []);

  if (isMobile || isLandScape) {
    pluginNavComponentProps.push(mobileSettingsLink(location.pathname));
  }

  const navItems = pluginNavComponentProps.map(item => ({
    ...item,
    label: typeof item.label === 'object' ? formatMessage(item.label) : item.label,
  }));

  function closeMobileNavBar(label) {
    if (label === formatMessage(SETTINGS_LABEL)) {
      toggleSettingsPanel();
    }

    toggleMobileNavBar(false);
  }

  return (
    <Fragment>
      <NavBar
        dataSelector={e2e.selectors.navBar.raw}
        navItems={navItems}
        isOpen={isMobile ? isMobileNavBarOpen : isTabletNavBarOpen}
        onClose={closeMobileNavBar}
        onNavItemClick={closeMobileNavBar}
      />
      <Visible when={isMobile || isLandScape}>
        <SettingsSidepanel
          isOpen={isSettingsOpen}
          onClose={toggleSettingsPanel}
        />
      </Visible>
    </Fragment>
  );
};

NavBarView.propTypes = {
  authToken: PropTypes.string,
  intl: intlShape.isRequired,
  isMobileNavBarOpen: PropTypes.bool.isRequired,
  isTabletNavBarOpen: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
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

const NavBarContainer = connect(stateMapper, actionsMapper)(injectIntl(withRouter(NavBarView)));

export { NavBarContainer };
