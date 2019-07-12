# Application Config

All the top level configuration for the application can be found on this directory.

### Plugin usage

In the file `plugins.js`, you can implement plugins in this way after installing them:
```
import { implementPlugin } from 'rdx/utils/implement-plugin';
import { BlueButtonPlugin, TestRoutePlugin } from 'plugins';

implementPlugin(BlueButtonPlugin);
implementPlugin(TestRoutePlugin);
```
