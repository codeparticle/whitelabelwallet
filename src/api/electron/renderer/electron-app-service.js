// use window.require to prevent requiring from server side which causes import bug
const { ipcRenderer, remote } = window.require('electron');
const log = remote.require('electron-log');

export default class ElectronAppService {
  // transmit event to main service to perform startup functions
  performStartupService() {
    ipcRenderer.send('perform-startup-setup');
  }

  initDeepLink(history) {
    ipcRenderer.on('open-url', (event, url) => {
      if (url.includes('api/')) {
        history.push(`/${url}`);
      }
    });
  }

  createAppMenus(intl) {
    log.debug('ElectronAppService::createAppMenus called');
    ipcRenderer.send('create-menu', intl);
  }
}
