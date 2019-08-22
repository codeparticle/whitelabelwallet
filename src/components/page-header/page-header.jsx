import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { IconVariants } from '@codeparticle/whitelabelwallet.styleguide/dist/components/icon';
import { injectIntl, intlShape } from 'react-intl';
import cn from 'classnames';
import { Visible } from '@codeparticle/react-visible';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { parseIntlText } from 'translations/keys';
import { empty } from 'lib/utils';
import './page-header.scss';

const {
  SvgMenu,
  SvgSettings,
  SvgUserAccount,
} = svgs.icons;

/**
  @typedef props
  @type {Object}
  @property {Object} intl
*/

/**
  Renders a Header Button Group
  @param {props} props
  @returns {Node} - rendered Header Button Group
*/
const PageHeaderView = ({
  actionButtons,
  hideIcons,
  intl,
  isTabletNavBarOpen,
  title,
  toggleMobileNavBar,
  toggleTabletNavBar,
}) => {
  const { isMobile, isDesktop, isWideScreen } = useMedia();
  const onTriggerClick = () => {
    isMobile ? toggleMobileNavBar(true) : toggleTabletNavBar(!isTabletNavBarOpen);
  };
  const navBarTriggerVariant = !isMobile && isTabletNavBarOpen ? IconVariants.PRIMARY : IconVariants.SLATE;

  return (
    <div className="page-header">
      <div>
        <Visible when={!isDesktop && !isWideScreen}>
          <Icon
            className={cn('page-header__icon', 'page-header__nav-bar-trigger')}
            onClick={onTriggerClick}
            variant={navBarTriggerVariant}
            icon={<SvgMenu />}
          />
        </Visible>
        <h1 className="page-header__title">
          {parseIntlText(intl, title)}
        </h1>
      </div>
      <div>
        <div className="page-header__action-buttons">
          {actionButtons}
        </div>
        <Visible when={!hideIcons}>
          <div className="page-header__icons">
            <Visible when={!isMobile}>
              <Icon
                className="page-header__icon"
                variant={IconVariants.SLATE}
                onClick={empty}
                icon={<SvgSettings />}
              />
            </Visible>
            <Icon
              className="page-header__icon"
              variant={IconVariants.SLATE}
              onClick={empty}
              icon={<SvgUserAccount />}
            />
          </div>
        </Visible>
      </div>
    </div>
  );
};

PageHeaderView.defaultProps = {
  actionButtons: null,
  hideIcons: false,
};

PageHeaderView.propTypes = {
  actionButtons: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  hideIcons: PropTypes.bool,
  intl: intlShape.isRequired,
  isTabletNavBarOpen: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  toggleMobileNavBar: PropTypes.func.isRequired,
  toggleTabletNavBar: PropTypes.func.isRequired,
};

const actionsMapper = getRdxActionMapper([
  'toggleMobileNavBar',
  'toggleTabletNavBar',
]);

const stateMapper = getRdxSelectionMapper({
  isTabletNavBarOpen: 'getIsTabletNavBarOpen',
});

const PageHeader = connect(stateMapper, actionsMapper)(injectIntl(PageHeaderView));

export { PageHeader };
