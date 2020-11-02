/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
import { svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { TransactionHistoryPage } from './pages';
import { addLocales } from './translations/add-locales';
import pluginId from './plugin-id';
import { transactionsReducer } from './rdx/reducers';
import { TRANSACTION_HISTORY } from './translations/keys';

export const TransactionHistoryPlugin = (store) => {
  store.dispatch(addLocales());
  store.injectPluginReducer('transactionsData', transactionsReducer);

  return [
    {
      role: 'main-route',
      components: [
        {
          path: '/transaction-history',
          component: TransactionHistoryPage,
          exact: true,
        },
      ],
    },
    {
      role: 'main-route-link',
      components: [
        {
          label: TRANSACTION_HISTORY.NAV_ITEM,
          Icon: svgs.icons.SvgTransactionHistory,
          path: `/${pluginId}`,
        },
      ],
    },
  ];
};
