import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'components';

const PluginInjectorView = ({
  className,
  plugins,
  role,
  wrappedByDiv,
}) => {
  const pluginsByRole = plugins[role] || [];

  return (
    <Fragment>
      {pluginsByRole.map((plugin, pluginIndex) => {
        const { components } = plugin;

        if (components) {
          const parsedComponents = (Array.isArray(components) ? components : [components]).map((Component, componentIndex) => (
            <ErrorBoundary key={componentIndex}>
              <Component data={plugin} />
            </ErrorBoundary>
          ));

          if (!wrappedByDiv) {
            return (
              <Fragment key={pluginIndex}>
                {parsedComponents}
              </Fragment>
            );
          }

          return (
            <div
              className={`plugin-injector-component ${className}`}
              key={pluginIndex}
            >
              {parsedComponents}
            </div>
          );
        }
      })}
    </Fragment>
  );
};

PluginInjectorView.propTypes = {
  className: PropTypes.string,
  plugins: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  wrappedByDiv: PropTypes.bool,
};

PluginInjectorView.defaultProps = {
  className: '',
  wrappedByDiv: false,
};

export default PluginInjectorView;
