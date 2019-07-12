import { app, ipcMain, Menu, session, shell } from 'electron';
import log from 'electron-log';
import * as Splashscreen from '@trodi/electron-splashscreen';
import path from 'path';
import url from 'url';
import { setupLogging } from 'config/utils/setup-logging';
import { environment } from 'lib/utils/environment';
import { isRequestAllowed } from 'lib/utils/is-request-allowed';
import { appMenu } from 'window/menus';
import { FileManager } from './file-manager';
import { AboutWindow } from './about-window';
import {
  ADD_ALLOWED_URLS,
  CREATE_MENU,
  OPEN_URL,
} from '../ipc-events';

export class MainWindow {
  constructor() {
    this.mainWindow = null;
    this.userApiUrls = '';
    this.fileManager = new FileManager(ipcMain);

    this.windowOptions = {
      width: 1400,
      height: 920,
      icon: path.join(__dirname, 'icons/64x64.png'),
      webPreferences: {
        nodeIntegration: true,
      },
    };

    this.splashscreenOptions = {
      windowOpts: this.windowOptions,
      templateUrl: path.join(__dirname, environment.isDev() ? '../../../../' : '../', 'templates/splashscreen/index.html'),
      splashScreenOpts: {
        width: 500,
        height: 500,
      },
    };
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new MainWindow();
    }

    return this._instance;
  }

  static resetInstance() {
    this._instance = null;
  }

  init() {
    // const enableDebug = process.env.ALLOW_DEBUG === 'true' || process.env.NODE_ENV === 'development';
    // require('electron-debug')({ enabled: enableDebug });

    setupLogging();
    log.info(`==== White Label Wallet is starting at ${new Date()} ====`);
    log.info(`=========== ${process.platform} platform ===========`);
    log.info(`======== ${process.env.NODE_ENV} enviroment ========`);

    app.setAppUserModelId('com.app.userId');
    app.setAsDefaultProtocolClient('white-label-wallet'); // Deep linking

    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('before-quit', this.onBeforeQuit);

    ipcMain.on(CREATE_MENU, this.createMenu);
    ipcMain.on(ADD_ALLOWED_URLS, this.addAllowedUrls);

    return this.mainWindow;
  }

  initSessionSecurity() {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      const {
        method,
        responseHeaders,
        url,
      } = details;

      if (isRequestAllowed({
        allowedUrls: this.userApiUrls,
        contentType: responseHeaders['content-type'],
        method,
        url,
      })) {
        callback({ responseHeaders });
      } else {
        console.error(`URL Or Method Not Allowed: ${method} / ${url}`);
      }
    });
  }

  createWindow = () => {
    this.initSessionSecurity();

    this.mainWindow = Splashscreen.initSplashScreen(this.splashscreenOptions);
    this.mainWindow.setMinimumSize(900, 600);

    // Emitted when the window is closed.
    this.mainWindow.on('closed', this.onMainWindowClosed);

    // Timeout prevents window from trying to load before complation is finished
    setTimeout(() => {
      let htmlPath = `${environment.isDev() ? '../../../../templates/dev/index-electron' : 'index'}.html`;
      htmlPath = path.join(__dirname, htmlPath);

      this.mainWindow.loadURL(url.format({
        pathname: htmlPath,
        protocol: 'file:',
        slashes: true,
      }));

      // open dev tools if in dev mode
      if (environment.isDev()) {
        this.mainWindow.webContents.once('dom-ready', () => {
          this.mainWindow.webContents.openDevTools();
        });

        // Focus the main window after dev tools opened
        this.mainWindow.webContents.on('devtools-opened', () => {
          this.mainWindow.focus();

          setImmediate(() => {
            this.mainWindow.focus();
          });
        });
      }
    }, environment.isDev() ? 5000 : 0);

    this.mainWindow.webContents.on('will-navigate', this.handleRedirect);
    this.mainWindow.webContents.on('new-window', this.handleRedirect);
  }

  addAllowedUrls = (event, urls) => {
    this.userApiUrls = urls;
    this.initSessionSecurity();
  }

  createMenu = (event, intl) => {
    let aboutWindow = null;
    const openAbout = () => {
      if (!aboutWindow) {
        aboutWindow = AboutWindow.instance.init();
      }

      aboutWindow.show();
    };

    const menu = Menu.buildFromTemplate(appMenu(app, this.mainWindow, intl, openAbout));

    if (process.platform === 'darwin') {
      Menu.setApplicationMenu(menu);
    } else {
      this.mainWindow.setMenu(menu);
    }

    // Add context menu with inspect element support
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const contextMenuOptions = [
        { label: intl.messages['menu.copy'], accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: intl.messages['menu.paste'], accelerator: 'CmdOrCtrl+V', role: 'paste' },
      ];

      if (environment.isDev()) {
        const { x, y } = props;
        contextMenuOptions.push({
          label: 'Inspect element',
          click() {
            this.mainWindow.inspectElement(x, y);
          },
        });
      }

      Menu.buildFromTemplate(contextMenuOptions).popup(this.mainWindow);
    });
  }

  handleRedirect = (e, url) => {
    if (url != this.mainWindow.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  }

  onBeforeQuit = () => {
    if (this.mainWindow) {
      this.mainWindow.removeAllListeners('close');
      this.mainWindow.close();
    }
  }

  onOpenUrl = (event, url) => {
    if (this.mainWindow) {
      this.mainWindow.webContents.send(OPEN_URL, url.split('//')[1]);
    }
  }

  onMainWindowClosed = () => {
    this.mainWindow = null;
  }

  onWindowAllClosed = () => {
    app.quit();
  }
}
