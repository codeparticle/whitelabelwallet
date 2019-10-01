import React from 'react';
import PropTypes from 'prop-types';
import { MobilePage, PageHeader } from 'components';
import { THEME_KEYS, useMedia, useTheme } from '@codeparticle/whitelabelwallet.styleguide';
import { white, darkBg } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';
import { VARIANTS } from 'lib/constants';

const { PRIMARY } = VARIANTS;

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
  contentStyles,
  dataSelector,
  headerProps,
  onAddClicked,
  sidepanel,
  removePadding,
}) => {
  const themeName = useTheme('name');
  const { isMobile } = useMedia();
  const background = themeName === THEME_KEYS.LIGHT
    ? white
    : darkBg;

  if (isMobile && headerProps.type === PRIMARY) {
    return (
      <main className={`mobile-page-rct-component ${themeName}`}>
        <MobilePage {...headerProps} dataSelector={dataSelector} onAddClicked={onAddClicked}>
          {children}
        </MobilePage>
        {sidepanel}
        <style jsx>
          {`
            .mobile-page-rct-component {
              background: ${background};
              width: 100%;
            }
          `}
        </style>
      </main>
    );
  }

  return (
    <main className="page-rct-component" data-selector={dataSelector}>
      <PageHeader {...headerProps} />
      <section
        className={`page-rct-component__content ${themeName} ${removePadding ? 'remove-padding' : ''}`}
        style={contentStyles}
      >
        {children}
        {sidepanel}
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
  contentStyles: {
    height: '100%',
  },
  sidepanel: null,
  onAddClicked: null,
};

Page.propTypes = {
  dataSelector: PropTypes.string,
  contentStyles: PropTypes.object,
  headerProps: PropTypes.shape({
    actionButtons: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    hideIcons: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  sidepanel: PropTypes.node,
};

export { Page };
