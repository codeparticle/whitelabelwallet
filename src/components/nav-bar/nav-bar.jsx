import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Logo } from '@codeparticle/whitelabelwallet.styleguide';
import { Link } from 'react-router-dom';
import { navigation } from 'config/routes';
import { TRANSLATION_KEYS } from 'translations/keys';
import colors from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';
import './nav-bar.scss';

const { NAVIGATION } = TRANSLATION_KEYS;
const { string, func } = PropTypes;

/**
  Renders a nav item
  @param {string} $0.label - label
  @param {string} $0.icon - an icon source
  @param {string} $0.alt - description for the icon
  @param {string} $0.path - location
  @returns {Node} - rendered NavItem
*/
const NavItem = ({
  label,
  Icon,
  path,
}, key) => (
  <Link key={key} to={path} className="nav-item-rct-component">
    <Icon fill={colors.white} width="46" height="46" className="nav-item-rct-component__icon" />
    <div className="nav-item-rct-component__label">{label}</div>
  </Link>
);

NavItem.propTypes = {
  label: string.isRequited,
  Icon: func.isRequited,
  path: string.isRequited,
};

/**
 * Renders navigation items
 * @param {Array} navItems - an array of nav items to render
 * @return {Node} rendered NavItems
 */
const renderNavItems = navItems => navItems.map(NavItem);

/**
 * Renders a navigation
 * @param {{intl: intlShape }} intl
 * @return {Node} rendered Navigation
 */
const NavBarComponent = ({ intl: { formatMessage }}) => {
  const navItems = navigation.map(item => ({
    ...item,
    label: formatMessage(item.label),
  }));

  return (
    <nav className="nav-bar-rct-component">
      <Link to="" className="nav-bar-rct-component__logo">
        <Logo />
      </Link>
      {renderNavItems(navItems)}
      <div className="nav-bar-rct-component__crypto-particle">
        <p>{formatMessage(NAVIGATION.POWERED_BY_LABEL)}</p>
        <a href="https://www.cryptoparticle.io/" target="_blank" className="nav-bar-rct-component__crypto-particle-link">
          {formatMessage(NAVIGATION.CRYPTO_PARTICLE_LABEL)}&trade;
        </a>
      </div>
    </nav>
  );
};

NavBarComponent.propTypes = {
    intl: intlShape.isRequired,
};

const NavBar = injectIntl(NavBarComponent);

export { NavBar };
