let debug = require('debug');

let errorMessage = debug('APP:ERROR');
let infoMessage = debug('APP:INFO');
let logMessage = debug('APP:LOG');

if(process.env.NODE_ENV === 'production'){
  debug.enable('APP:ERROR,APP:INFO')
}else{
  debug.enable('APP:*')
}


export {errorMessage, infoMessage, logMessage}
