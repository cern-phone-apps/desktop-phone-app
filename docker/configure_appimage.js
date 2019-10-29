const system = require('system-commands');

exports.default = async function(context) {

  // TODO Run this only on the linux build
  if (process.env.SET_NO_SANDBOX !== 'true') {
    console.log('Not setting the sandbox mode to false');
    return;
  }

  console.log('Adding --no-sandox to AppImage');
  system('docker build docker/');
  system(
    "docker run -v $(pwd)/dist/:/root/home/ --privileged $(docker images -a | awk '{ print $3}' | awk 'NR==2')"
  );
  console.log('Done.');
  return [];
};
