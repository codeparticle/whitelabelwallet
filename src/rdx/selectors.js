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
import activeRequestsSelectors from 'rdx/modules/active-requests/selectors';
import apiSelectors from 'rdx/modules/api/selectors';
import appSelectors from 'rdx/modules/app/selectors';
import localeSelectors from 'rdx/modules/locale/selectors';
import routerSelectors from 'rdx/modules/router/selectors';
import authSelectors from 'rdx/modules/auth/selectors';
import messageSelectors from 'rdx/modules/messages/selectors';
import navBarSelectors from 'rdx/modules/nav-bar/selectors';
import pluginsSelectors from 'rdx/modules/plugins/selectors';
import selectedSelectors from 'rdx/modules/selected/selectors';
import settingsSelectors from 'rdx/modules/settings/selectors';
import transactionsSelectors from 'rdx/modules/transactions/selectors';
// IMPORT_PT (for script -- do not remove!)

const selectors = {
  ...activeRequestsSelectors,
  ...apiSelectors,
  ...appSelectors,
  ...localeSelectors,
  ...routerSelectors,
  ...authSelectors,
  ...messageSelectors,
  ...navBarSelectors,
  ...pluginsSelectors,
  ...selectedSelectors,
  ...settingsSelectors,
  ...transactionsSelectors,
// INSERTION_PT (for script -- do not remove!)
};

export default selectors;
