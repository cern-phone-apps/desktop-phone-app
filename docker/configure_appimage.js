const system = require('system-commands');

exports.default = async function(context) {
  // TODO Run this only on the linux build
  if (process.env.SET_NO_SANDBOX !== 'true') {
    console.log('Not setting the sandbox mode to false');
    return;
  }

  console.log('Adding --no-sandox to AppImage');
  console.log('Building Docker image');
  system('docker build docker/')
    .then(output => {
      // Log the output
      console.log(output);
    })
    .catch(error => {
      // An error occurred! Log the error
      console.error(error);
    });
  console.log('Running docker image');
  system(
    "docker run -v $(pwd)/dist/:/root/home/ --privileged $(docker images -a | awk '{ print $3}' | awk 'NR==2')"
  )
    .then(output => {
      // Log the output
      console.log(output);
    })
    .catch(error => {
      // An error occurred! Log the error
      console.error(error);
    });
  console.log('Done.');
  return [];
};
