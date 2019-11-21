## Packaging and Deployment

The application can be packed in several ways. The important thing to note is that depending on the target (windows, linux and mac) there will be different parts involved.

- [Packaging](#packaging):
  - [Packaging for Mac](#packaging-for-mac)
  - [Packaging for Windows](#packaging-for-windows)
  - [Packaging for Linux](#packaging-for-linux)
  - [Packaging Next](#packaging-next)
- [Deployment](#deployment)


### Packaging

#### Packaging for Mac

##### Configuration required

Create a `.env` file with the following values:

- `APPLEID`: Apple ID email used in the Apple developer portal.
- `APPLEIDPASS`: Apple ID password.

These two values are used for notarizing the application:
    - More info in [this Blog](https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/) and in [the Apple Docs](https://developer.apple.com/documentation/security/notarizing_your_app_before_distribution)

##### Commands

- `yarn pack-mac-prod`: Packages the app without notarazing it. Useful for testing locally.
- `yarn pack-mac-prod-notarized`: Packages the app and notarizes it using the Apple Services (this is required on >= Mac OS Catalina). It will run the `electron-builder-scripts/notarize.js` after the packaging is complete.

#### Packaging for Windows

##### Configuration required

Create a `electorn-builder.env` file with the following values:

- `GH_TOKEN`: This token is required to deploy the application on Github. It can be generated here: https://github.com/settings/tokens/new and the scope must be repository.
- `WIN_CSC_LINK`: Path to the `.p12` code signing certificate. This certificate is generated through the [CERN CA](https://ca.cern.ch/ca/user/Request.aspx?template=CERNCodeSigningCertificate)
- `WIN_CSC_KEY_PASSWORD`: Password for the `WIN_CSC_LINK` certificate.

##### Commands

- `yarn pack-windows-prod`: Packages the application for Windows.

#### Packaging for Linux

On some Linux distros, `--no-sandbox` is needed in order to run the application. We are applying this flag using `Docker` after the Linux packages are created. Check the [Steps to generate the propper AppImage](linux-app-image.md) section for more details.

##### Commands

- `yarn pack-linux-prod`: Packages the application for Linux.

#### Packaging Next

Next version is an alternative version that allows us to test electron-builder builds and point to diffent backends.

`electron-builder-next.json` file is used to pack the application in `NEXT` mode.

- `yarn electron-pack-next`: Generates packages for Mac, Windows and Linux on the `dist` dir. Sets `REACT_APP_NEXT` to true.
- `yarn publish-next`: Publish the current version of the app in Github releases, but enables the "beta" channel.

### Deployment

#### Release Channels

From electron-builder docs: https://www.electron.build/tutorials/release-using-channels

The following versions will be distributed to users depending on the channel defined:

- `Release` : users will get the latest release version
- `Prerelease`: users will get the latest prerelease version

The deployment of the application must be done in 3 phases, one for each platform.

##### Sample of releases usage

Imagine that your application is stable and in version `1.0.1`.

If you want to release a beta for the new `1.1.0` version, you only need to publish a prerelease.

When your application is stable enough, you want to release it to all users. For that, you only need to publish it as release.

#### Commands

- `yarn publish-prod-mac`: Generates packages for Mac (signing and notarizing the app if possible) on the `dist` dir and then uploads them to Github as a `draft` (Won't be visible to users).
- `yarn publish-prod-win`: Generates packages for Windows (signing the app if possible) on the `dist` dir and then uploads them to Github as a `draft` (Won't be visible to users).
- `yarn publish-prod-linux`: Generates packages for Linux (adding the --no-sandbox to the binary using docker) on the `dist` dir and then uploads them to Github as a `draft` (Won't be visible to users).

#### How to clean all the build releases

Run the following command on `webapp` folder (this one).
```
xattr -cr .
```