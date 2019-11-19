import AutoLaunch from 'auto-launch';
import { app } from 'electron';
import isDev from 'electron-is-dev';

export default class AutoLauncher {
  constructor() {
    // On Mac, work around a bug in auto-launch where it opens a Terminal window
    // See https://github.com/Teamwork/node-auto-launch/issues/28#issuecomment-222194437
    const appPath =
      process.platform === 'darwin'
        ? app.getPath('exe').replace(/\.app\/Content.*/, '.app')
        : undefined; // Use the default

    this.appLauncher = new AutoLaunch({
      name: app.getName(),
      path: appPath,
      isHidden: false
    });
  }

  isEnabled() {
    return this.appLauncher.isEnabled();
  }

  async blankPromise() {
    return null;
  }

  async enable() {
    if (isDev) {
      console.log('In development mode, autostart config never effects');
      return this.blankPromise();
    }
    const enabled = await this.isEnabled();
    if (!enabled) {
      return this.appLauncher.enable();
    }
    return this.blankPromise();
  }

  async disable() {
    if (isDev) {
      console.log('In development mode, autostart config never effects');
      return this.blankPromise();
    }
    const enabled = await this.isEnabled();
    if (enabled) {
      return this.appLauncher.disable();
    }
    return this.blankPromise();
  }
}
