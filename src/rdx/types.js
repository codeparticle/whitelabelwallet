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
import activeRequestsTypes from 'rdx/modules/active-requests/types';
import appTypes from 'rdx/modules/app/types';
import authTypes from 'rdx/modules/auth/types';
import messageTypes from 'rdx/modules/messages/types';
import navBarTypes from 'rdx/modules/nav-bar/types';
import pluginsTypes from 'rdx/modules/plugins/types';
import routerTypes from 'rdx/modules/router/types';
import selectedTypes from 'rdx/modules/selected/types';
import settingsTypes from 'rdx/modules/settings/types';
import transactionsTypes from 'rdx/modules/transactions/types';
// IMPORT_PT (for script -- do not remove!)

const types = {
  ...activeRequestsTypes,
  ...appTypes,
  ...authTypes,
  ...messageTypes,
  ...navBarTypes,
  ...pluginsTypes,
  ...routerTypes,
  ...selectedTypes,
  ...settingsTypes,
  ...transactionsTypes,
// INSERTION_PT (for script -- do not remove!)
};

export default types;
