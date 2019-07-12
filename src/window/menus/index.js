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

