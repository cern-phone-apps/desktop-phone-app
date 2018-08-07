var mockServer = require('node-mock-server');
var path = require('path');
var URL_BASE = require('./config')

console.log(URL_BASE)

mockServer({
  'restPath': path.join(__dirname, '/rest'),
  'uiPath': '/ui',
  'title': 'Api mock server',
  'version': 1,
  'urlBase': URL_BASE,
  'urlPath': '',
  'port': 8080,
  'certificate': path.join(__dirname, '/cert.pem'),
  'privateKey': path.join(__dirname, '/key.pem'),
  'contentType': 'application/json',
  'accessControlExposeHeaders': 'X-Total-Count',
  'accessControlAllowOrigin': 'https://macbook-cdaic.cern.ch:3000',
  'accessControlAllowMethods': 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
  'accessControlAllowHeaders': 'origin, x-requested-with, content-type, x-csrf-token',
  'accessControlAllowCredentials': 'true',
  'headers': {},
  'open': true,
  'dirName': __dirname
});
