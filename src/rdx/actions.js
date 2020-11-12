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
import activeRequestsActions from 'rdx/modules/active-requests/actions';
import apiActions from 'rdx/modules/api/actions';
import appActions from 'rdx/modules/app/actions';
import authActions from 'rdx/modules/auth/actions';
import messageActions from 'rdx/modules/messages/actions';
import navBarActions from 'rdx/modules/nav-bar/actions';
import pluginsActions from 'rdx/modules/plugins/actions';
import routerActions from 'rdx/modules/router/actions';
import selectedActions from 'rdx/modules/selected/actions';
import settingsActions from 'rdx/modules/settings/actions';
import transactionsActions from 'rdx/modules/transactions/actions';
// IMPORT_PT (for script -- do not remove!)

const actions = {
  ...activeRequestsActions,
  ...apiActions,
  ...appActions,
  ...authActions,
  ...messageActions,
  ...navBarActions,
  ...pluginsActions,
  ...routerActions,
  ...selectedActions,
  ...settingsActions,
  ...transactionsActions,
// INSERTION_PT (for script -- do not remove!)
};

export default actions;
