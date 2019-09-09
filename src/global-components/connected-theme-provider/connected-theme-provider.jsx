import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@codeparticle/whitelabelwallet.styleguide';
import { connect } from 'react-redux';
import { getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const ConnectedThemeProvider = ({
  children,
  theme,
}) => (
  <ThemeProvider themeKey={theme}>
    {children}
  </ThemeProvider>
);

ConnectedThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
};

const stateMapper = getRdxSelectionMapper({
  theme: 'getTheme',
});

export default connect(stateMapper, null)(ConnectedThemeProvider);
