const system = require('system-commands');

exports.default = async function(context) {
  const { electronPlatformName } = context;
  if (electronPlatformName !== 'linux') {
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
