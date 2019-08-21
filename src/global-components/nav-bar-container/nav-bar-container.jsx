import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { NavBar } from '@codeparticle/whitelabelwallet.styleguide';
import { getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import './nav-bar-container.scss';

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
}) => {
  if (!authToken) {
    return null;
  }

  const pluginNavComponentProps = (plugins['main-route-link'] || []).reduce((acc, { components }) => {
    acc.push(...components);

    return acc;
  }, []);

  const navItems = pluginNavComponentProps.map(item => ({
    ...item,
    label: typeof item.label === 'object' ? formatMessage(item.label) : item.label,
  }));

  return (
    <NavBar navItems={navItems} isOpen />
  );
};

NavBarView.propTypes = {
  authToken: PropTypes.string,
  intl: intlShape.isRequired,
  plugins: PropTypes.object.isRequired,
};

const stateMapper = getRdxSelectionMapper({
  authToken: 'getAuthToken',
  plugins: 'getPlugins',
});

const NavBarContainer = connect(stateMapper, null)(injectIntl(NavBarView));

export { NavBarContainer };
