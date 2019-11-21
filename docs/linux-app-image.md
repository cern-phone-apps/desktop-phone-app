# Steps to generate the propper AppImage

We had some difficulties when we tried to install our AppImage in `Centos 7`.

By default the application was launched in a sandbox, which was making it crash. This is a kernel level configuration.

If you take a look at our `build` section in `package.json`, you will find this command : `afterAllArtifactBuild`

This command is launched right after the entire packaging step. It will call a function (docker/configure_appimage.js).

This function will generate a docker image (docker/dockerfile) if it doesn't exists yet.

This Docker Image has an entrypoint on a bash file that will add `--no-sandbox` option to the AppImage.

`A volume attached to ***dist/*** will be used to get and modify the AppImage.`

Then, once the docker image generated, the same function will get the docker image ID and launch it.

`It will use the latest file matching this : dist/cern-phone-app-*-x86-64-linux.AppImage`

You will see some logs during the packaging step related to this part.

Every steps related to this part are in `docker/`.