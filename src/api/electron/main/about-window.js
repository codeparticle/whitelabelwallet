import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import path from 'path';
import { environment } from 'lib/utils/environment';

export default class AboutWindow {
  constructor() {
    this.aboutWindow = null;
    this.terminateAboutWindow = false;

    this.windowOptions = {
      fullscreenable: false,
      show: false,
      width: 640,
      height: 500,
      webPreferences: {
        webviewTag: false,
      },
    };
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new AboutWindow();
    }

    return this._instance;
  }

  static resetInstance() {
    this._instance = null;
  }

  init() {
    app.on('before-quit', this.onBeforeQuit);

    // Load About window but keep it hidden
    this.aboutWindow = new BrowserWindow(this.windowOptions);

    // Prevent resize about window
    this.aboutWindow.setMinimumSize(this.windowOptions.width, this.windowOptions.height);
    this.aboutWindow.setMaximumSize(this.windowOptions.width, this.windowOptions.height);
    // Set default title
    this.aboutWindow.setTitle('About White Label Wallet');

    // Update about window title when translation is ready
    ipcMain.on('about-window-title', this.updateWindowTitle);

    // IPC endpoint to reload about window (e.g: for updating displayed language)
    ipcMain.on('reload-about-window', this.reloadAboutWindow);

    // Load the url for the window
    let htmlPath = `${environment.isDev() ? '../../templates/dev/index-electron' : 'index'}.html?window=about`;
    htmlPath = path.join(__dirname, htmlPath);

    this.aboutWindow.loadURL(`file:///${htmlPath}`);

    // Prevent native window title changes (we are handling these via IPC)
    this.aboutWindow.on('page-title-updated', event => event.preventDefault());

    // Prevent direct link navigation in electron window -> open in default browser
    this.aboutWindow.webContents.on('will-navigate', this.onWillNavigate);

    // Add 'inspect element' to context menu in dev modes
    this.aboutWindow.webContents.on('context-menu', this.onContextMenu);

    this.aboutWindow.on('close', this.onClose);

    return this.aboutWindow;
  }

  reloadAboutWindow = (event) => {
    // Check that the about window exists but is not the sender of the ipc message!
    // Otherwise it endlessly re-loads itself.
    if (this.aboutWindow && event.sender !== this.aboutWindow.webContents) {
      this.aboutWindow.reload();
    }
  }

  updateWindowTitle = (event, title) => {
    if (this.aboutWindow) {
      this.aboutWindow.setTitle(title);
    }
  }

  onBeforeQuit = () => {
    // Only really terminate about window when whole app is closed
    // otherwise keep it in the background so we can quickly reveal it
    this.terminateAboutWindow = true;
  }

  onClose = (e) => {
    if (this.terminateAboutWindow) {
      // The user is quitting the app
      app.quit();
    } else {
      // The user only closed the about window (so let's hide it)
      e.preventDefault();
      this.aboutWindow.hide();
    }
  }

  onContextMenu = (e, props) => {
    const contextMenuOptions = [];

    if (environment.isDev()) {
      const { x, y } = props;
      contextMenuOptions.push({
        label: 'Inspect element',
        click() {
          this.aboutWindow.inspectElement(x, y);
        },
      });
    }

    Menu.buildFromTemplate(contextMenuOptions).popup(this.aboutWindow);
  }

  onWillNavigate = (e, url) => {
    e.preventDefault();
    const history = e.sender.history;
    if (history.length && url !== history[history.length - 1]) {
      shell.openExternal(url);
    }
  }
}
