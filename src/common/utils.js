let debug = require('debug');

let error = debug('APP:ERROR');
let info = debug('APP:INFO');
let log = debug('APP:LOG');

if(process.env.NODE_ENV === 'production'){
  debug.enable('APP:ERROR,APP:INFO')
}else{
  debug.enable('APP:*')
}

export {error, log, info}
