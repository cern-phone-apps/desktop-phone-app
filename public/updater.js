const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const storage = require('electron-json-storage');

let updater;
autoUpdater.autoDownload = false;

autoUpdater.on('error', error => {
  dialog.showErrorBox(
    'Error: ',
    error == null ? 'unknown' : (error.stack || error).toString()
  );
  updater.enabled = true;
  updater = null;
});

autoUpdater.on('update-available', (info) => {

  dialog.showMessageBox(
    {
      type: 'info',
      title: 'Found Updates',
      message: `Found updates, do you want update now? (${info.version})`,
      buttons: ['Yes', 'No']
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater.enabled = true;
        updater = null;
      }
    }
  );
});

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  });
  updater.enabled = true;
  updater = null;
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(
    {
      title: 'Install Updates',
      message: 'Update downloaded, the application will now restart.'
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});

// export this to MenuItem click callback
function checkForUpdates(menuItem, focusedWindow, event) {
  updater = menuItem;
  updater.enabled = false;

  storage.get('update_channel', (error, data) => {
    const channel = data.channel || 'latest';
    if (channel === 'latest') {
      autoUpdater.allowPrerelease = false;
    } else {
      autoUpdater.allowPrerelease = true;
    }
    console.log(`Setting allowPrerelease to ${autoUpdater.allowPrerelease}`);

    if (error) {
      console.log(`Error found checking updates: ${error}`);
    }
    console.log(`Auto Updater is set to ${autoUpdater.channel}`);
    console.log(`Current version of the app is ${autoUpdater.currentVersion}`);
    autoUpdater.checkForUpdates();
  });
}
module.exports.checkForUpdates = checkForUpdates;
