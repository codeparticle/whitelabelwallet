# Coins

The Coins directory is where additional coins can be added into the WLW app.
To implement a coin, write a class that will extend the ApiBlockchainManager (src/api/api-blockchain-manager).
The coin's manager should implement all of the required methods in the ApiBlockchainManager.
To use the new manager within the app, export it in `coins/index.js` in the blockchainManagers object. Then, in your .env file (or launch script) set a COIN variable to your coin's key in the object.

**Note:** If the COIN key param you pass in your launch script is undefined in the blockchainManagers object, or if you don't specify a coin, the app will default to using bitcoin's manager.

### Examples (using bitcoin):

#### Writing a coin manager

```js
import { ApiBlockchainManager } from 'api/api-blockchain-manager';

class BitcoinManager extends ApiBlockchainManager {
  // Implement required methods
```

#### Registering the new manager

```js
// coins/index.js
import { BitcoinManager } from './bitcoin';

export const blockchainManagers = {
  btc: BitcoinManager,
};

```

.env:
```
COIN='btc'
```

package.json:
```js
  "dev": "COIN=btc ...rest of script",
```

#### Using the manager

```jsx
import { BlockchainManager } from 'coins';

// Code
```
