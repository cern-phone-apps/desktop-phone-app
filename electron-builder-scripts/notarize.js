require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { notarize } = require('electron-notarize');

module.exports = async function(params) {
  // Only notarize the app on Mac OS only.
  const {electronPlatformName} = params;
  if (electronPlatformName !== 'darwin' || process.env.NOTARIZE === 'false') {
    console.log('Not notarizing the app');
    return;
  }

  // Same appId in electron-builder.
  const appId = 'ch.cern.phonewebapp';

  const appPath = path.join(
    params.appOutDir,
    `${params.packager.appInfo.productFilename}.app`
  );
  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  console.log(`Notarizing ${appId} found at ${appPath}`);

  console.log(`Apple ID used: ${process.env.APPLEID}`);

  try {
    await notarize({
      appBundleId: appId,
      appPath,
      appleId: process.env.APPLEID,
      appleIdPassword: process.env.APPLEIDPASS
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};
