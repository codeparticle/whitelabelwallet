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

import 'react-hot-loader';
import 'application-config/plugins';
import React from 'react';
import '@ionic/core/css/ionic.bundle.css';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { addLocaleData } from 'react-intl';
import { createBrowserHistory } from 'history';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import de from 'react-intl/locale-data/de';
import ja from 'react-intl/locale-data/ja';
import cs from 'react-intl/locale-data/cs';
import el from 'react-intl/locale-data/el';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import ka from 'react-intl/locale-data/ka';
import nl from 'react-intl/locale-data/nl';
import pl from 'react-intl/locale-data/pl';
import sr from 'react-intl/locale-data/sr';
import tr from 'react-intl/locale-data/tr';
import vi from 'react-intl/locale-data/vi';
import zh from 'react-intl/locale-data/zh';
import { About } from 'components';
import { setAppElement } from '@codeparticle/whitelabelwallet.styleguide';
import { ConnectedIntlProvider } from 'global-components';
import { getUrlParameterByName } from 'lib/utils';
import configureStore from 'rdx/configure-store';
import { App } from './app';
import './index.scss';
import '../icons/icon.ico';

addLocaleData([
  ...en,
  ...ru,
  ...de,
  ...ja,
  ...cs,
  ...el,
  ...es,
  ...fr,
  ...ka,
  ...nl,
  ...pl,
  ...sr,
  ...tr,
  ...vi,
  ...zh,
]);

const rootElement = document.getElementById('root');
const isAboutPage = getUrlParameterByName('window') === 'about';
setAppElement(rootElement);

if (isAboutPage) {
  const history = createBrowserHistory();
  const { store } = configureStore(history);

  render(
    <Provider store={store}>
      <ConnectedIntlProvider>
        <About />
      </ConnectedIntlProvider>
    </Provider>,
    rootElement
  );
} else {
  render(
    <App />,
    rootElement
  );
}
