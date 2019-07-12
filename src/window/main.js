import log from 'electron-log';
import { MainWindow } from 'api/electron/main';
import { setupLogging } from 'config/utils/setup-logging';

// const enableDebug = process.env.ALLOW_DEBUG === 'true' || process.env.NODE_ENV === 'development';
// require('electron-debug')({ enabled: enableDebug });

setupLogging();
log.info(`==== White Label Wallet is starting at ${new Date()} ====`);
log.info(`=========== ${process.platform} platform ===========`);
log.info(`======== ${process.env.NODE_ENV} enviroment ========`);

MainWindow.instance.init();
