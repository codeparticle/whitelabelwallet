# Plugins

This is a directory for sample plugins.

### Plugin Architecture

A plugin can have access to the redux state of the application and it can implement any kind of component.
The only must do is export a function which returns the configuration for the plugin.

Example:
```
const BlueButtonPlugin = (store) => {
  store.injectPluginReducer('blueButton', blueButton);

  return [
    {
      role: 'button',
      components: BlueButtonComponent,
    },
  ];
};

export { BlueButtonPlugin };
```

The `store` object is passed from the application so the plugin is able to inject reducer with the custom method `injectPluginReducer` or do any other actions with the store.

### Config Format

The plugins returned function should be returning an Array of a single Object as config. That means a single pluign can have multiple effects on the application.

These are all the roles plugins can have at the moment:
| role | description |
| ---- | ----------- |
| button | Appears as a button on the main page |
| main-route | Adds a completely new route to the top level of the application |

### Registering Plugin

Plugins are automatically registered by importing them to the plugins/index.js and adding them to the exported plugins array.

```js
import { MyPlugin } from './my-plugin';

export const plugins = [
  MyPlugin,
];
```
