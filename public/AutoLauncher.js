const AutoLaunch = require('auto-launch');
const { app } = require('electron');
const isDev = require('electron-is-dev');

const appPath =
  process.platform === 'darwin'
    ? app.getPath('exe').replace(/\.app\/Content.*/, '.app')
    : undefined; // Use the default

const appLauncher = new AutoLaunch({
  name: app.getName(),
  path: appPath,
  isHidden: false
});

const AutoLauncher = {
  isEnabled() {
    return appLauncher.isEnabled();
  },

  async blankPromise() {
    return null;
  },

  async enable() {
    if (isDev) {
      console.log('In development mode, autostart config never effects');
      return AutoLauncher.blankPromise();
    }
    const enabled = await AutoLauncher.isEnabled();
    if (!enabled) {
      return appLauncher.enable();
    }
    return AutoLauncher.blankPromise();
  },

  async disable() {
    if (isDev) {
      console.log('In development mode, autostart config never effects');
      return AutoLauncher.blankPromise();
    }
    const enabled = await AutoLauncher.isEnabled();
    if (enabled) {
      return appLauncher.disable();
    }
    return AutoLauncher.blankPromise();
  }
};

module.exports.AutoLauncher = AutoLauncher;
