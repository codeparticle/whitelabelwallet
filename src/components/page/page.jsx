import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'components/page-header';
import { THEME_KEYS, useTheme } from '@codeparticle/whitelabelwallet.styleguide';
import { cloud, darkBg } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';

import './page.scss';

/**
  @typedef headerProps
  @type {Object}
  @property {Node} PrimaryAction
  @property {Node} SecondaryAction
  @property {string} title
  @property {string} to - only needed for 'secondary' type
  @property {string} type - 'primary' or 'secondary'
 */

/**
  @typedef props
  @type {Object}
  @property {Node} children
  @property {headerProps} headerProps - props passed to the PageHeader
*/

/**
  Page wrapper
  @param {props} - props
  @returns {Node} - rendered Page
*/
const Page = ({
  children,
  dataSelector,
  headerProps,
}) => {
  const themeName = useTheme('name');
  const background = themeName === THEME_KEYS.LIGHT
    ? cloud
    : darkBg;

  return (
    <main className="page-rct-component" data-selector={dataSelector}>
      <PageHeader {...headerProps} />
      <section className={`page-rct-component__content ${themeName}`}>
        {children}
      </section>
      <style jsx>
        {`
          .page-rct-component {
            background: ${background} !important;
          }
        `}
      </style>
    </main>
  );
};

Page.defaultProps = {
  dataSelector: 'page',
  headerProps: {},
};

Page.propTypes = {
  dataSelector: PropTypes.string,
  headerProps: PropTypes.shape({
    actionButtons: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    hideIcons: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export { Page };
