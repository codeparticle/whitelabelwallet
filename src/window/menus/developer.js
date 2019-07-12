export const devMenu = (window) => (
  {
    label: 'Developer',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => window.webContents.reload(),
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => window.setFullScreen(!window.isFullScreen()),
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: () => window.toggleDevTools(),
      },
    ],
  }
);
