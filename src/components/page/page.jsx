import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'components/page-header';

import './page.scss';

/**
  @typedef props
  @type {Object}
  @property {Node} children
  @property {Object} headerProps - props passed to the PageHeader
*/

/**
  Page wrapper
  @param {props} - props
  @returns {Node} - rendered Page
*/
const Page = ({
  children,
  headerProps,
}) => {
  return (
    <main className="page-rct-component">
      <PageHeader {...headerProps} />
      {children}
    </main>
  );
};

Page.defaultProps = {
  headerProps: {},
};

Page.propTypes = {
  headerProps: PropTypes.shape({
    actionButtons: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    hideIcons: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
};

export { Page };
