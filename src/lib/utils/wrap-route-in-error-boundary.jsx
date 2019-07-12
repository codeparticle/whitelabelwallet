import React from 'react';
import { ErrorBoundary } from 'components';

const wrapRouteInErrorBoundary = (routeProps) => {
  const parsedRouteProps = { ...routeProps };

  if (routeProps.render) {
    parsedRouteProps.render = (...args) => {
      return (
        <ErrorBoundary>
          {routeProps.render(...args)}
        </ErrorBoundary>
      );
    };
  }

  if (routeProps.component) {
    parsedRouteProps.component = (props) => {
      const Component = routeProps.component;

      return (
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      );
    };
  }

  return parsedRouteProps;
};

const wrapRoutesInErrorBoundary = (allRouteProps = []) => {
  return allRouteProps.map(wrapRouteInErrorBoundary);
};

export { wrapRouteInErrorBoundary, wrapRoutesInErrorBoundary };
