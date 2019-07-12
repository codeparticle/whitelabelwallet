import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { wrapRouteInErrorBoundary } from 'lib/utils';
import PluginInjectorView from './plugin-injector-view';

const PluginInjector = (props) => {
  const {
    plugins,
    role,
    wrappedByRouter,
  } = props;

  if (wrappedByRouter) {
    const pluginsByRole = plugins[role] || [];

    return (
      <Fragment>
        {pluginsByRole.map((plugin) => (
          (plugin.components || []).map((routeProps, index) => (
            <Route
              key={index}
              {...wrapRouteInErrorBoundary(routeProps)}
            />
          ))
        ))}
      </Fragment>
    );
  }

  return <PluginInjectorView {...props} />;
};

PluginInjector.propTypes = {
  plugins: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  wrappedByRouter: PropTypes.bool,
};

PluginInjector.defaultProps = {
  wrappedByRouter: false,
};

const stateMapper = getRdxSelectionMapper({
  plugins: 'getPlugins',
});

export default connect(stateMapper, null)(PluginInjector);
