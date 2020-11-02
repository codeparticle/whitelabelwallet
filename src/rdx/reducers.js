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
import { combineReducers } from 'redux';
import activeRequestsReducers from 'rdx/modules/active-requests/reducers';
import apiReducers from 'rdx/modules/api/reducers';
import appReducers from 'rdx/modules/app/reducers';
import authReducers from 'rdx/modules/auth/reducers';
import localeReducers from 'rdx/modules/locale/reducers';
import messageReducers from 'rdx/modules/messages/reducers';
import navBarReducers from 'rdx/modules/nav-bar/reducers';
import pluginsReducers from 'rdx/modules/plugins/reducers';
import routerReducers from 'rdx/modules/router/reducers';
import selectedReducers from 'rdx/modules/selected/reducers';
import settingsReducers from 'rdx/modules/settings/reducers';
import transactionsReducers from 'rdx/modules/transactions/reducers';
import { connectRouter } from 'connected-react-router';
// IMPORT_PT (for script -- do not remove!)

export const reducers = {
  ...activeRequestsReducers,
  ...apiReducers,
  ...appReducers,
  ...authReducers,
  ...localeReducers,
  ...messageReducers,
  ...navBarReducers,
  ...pluginsReducers,
  ...routerReducers,
  ...selectedReducers,
  ...settingsReducers,
  ...transactionsReducers,
// INSERTION_PT (for script -- do not remove!)
};

export default function compileReducers(history, pluginsReducers) {
  return combineReducers({
    ...pluginsReducers,
    ...reducers,
    router: connectRouter(history),
  });
}
