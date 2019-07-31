import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { FlashMessages } from 'components';
import { connect } from 'react-redux';
import { getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { wrapRoutesInErrorBoundary } from 'lib/utils';
// IMPORT_PT (routes, and components -- do not remove!)

// IMPORT_PT: to see the app in loggedIn state,
// go to `/src/rdx/modules/auth/reducers`
// and change the authToken to a non-empty string

// IMPORT_PT: if persistGate is 'on', user must go to console => applicaiton tab
// => local storage and remove 'persist:root' to reload the default state
function renderRoute(props, route, index) {
  return (
    <Route {...props} key={index} {...route} />
  );
}

function getRoutesWithPlugins(routes, plugins) {
  const rawRoutes = wrapRoutesInErrorBoundary((plugins['main-route'] || []).map((plugin) => (
    plugin.components || []
  )));

  // flattens array of objects w/ nested child-objects into [{ 0: {} }, { 0: {}, 1: {} }]
  // array with all of the child-objects at the first level [{}, {}, {}]
  const pluginRoutes = [].concat(...rawRoutes.map(parent => {
    return Object.keys(parent).map((child) => parent[child]);
  }));

  return [
    ...routes,
    ...pluginRoutes,
  ].sort((a, b) => {
    if (a.exact) {
      if (b.exact) {
        return 0;
      }

      return -1;
    }

    return 1;
  });
}

const RootRouter = (props) => (
  <Fragment>
    <Switch>
      {getRoutesWithPlugins(props).map((route, index) => renderRoute(props, route, index))}
    </Switch>
    <FlashMessages />
  </Fragment>
);

RootRouter.propTypes = {
  plugins: PropTypes.object.isRequired,
};

const stateMapper = getRdxSelectionMapper({
  plugins: 'getPlugins',
});

export default connect(stateMapper, null)(RootRouter);
