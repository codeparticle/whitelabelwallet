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
import { shell } from 'electron';
import { environment } from 'lib/utils/environment';
import { devMenu } from './developer';

const manualURL = `${environment.homepage}#user-manuals`;

export const appMenu = (app, window, intl, openAbout) => {
  const menu = [{
    label: 'White Label Wallet',
    submenu: [{
      label: intl.messages['menu.about'],
      click: () => openAbout(),
    }, {
      label: intl.messages['menu.quit'],
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        window.close();
      },
    }],
  }, {
    label: intl.messages['menu.edit'],
    submenu: [{
      label: intl.messages['menu.undo'],
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo',
    }, {
      label: intl.messages['menu.redo'],
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo',
    }, {
      type: 'separator',
    }, {
      label: intl.messages['menu.cut'],
      accelerator: 'CmdOrCtrl+X',
      role: 'cut',
    }, {
      label: intl.messages['menu.copy'],
      accelerator: 'CmdOrCtrl+C',
      role: 'copy',
    }, {
      label: intl.messages['menu.paste'],
      accelerator: 'CmdOrCtrl+V',
      role: 'paste',
    }, {
      label: intl.messages['menu.select-all'],
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall',
    }],
  }, {
    label: intl.messages['menu.help'],
    submenu: [{
      label: intl.messages['menu.user-manual'],
      accelerator: 'CmdOrCtrl+H',
      click: () => {
        shell.openExternal(manualURL);
      },
    }],
  }];

  if (environment.isDev()) {
    menu.push(devMenu(window));
  }

  return menu;
};

