const electron = window.require('electron');
const { remote } = electron;
const fs = remote.require('fs');

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  };
}

function readFile(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      let result;

      try {
        result = JSON.parse(data);
      } catch (err) {
        return callback(err);
      }

      callback(null, result);
    }
  });
}

class Backend {
  constructor(services, options = {}) {
    this.init(services, options);
    this.type = 'backend';
  }

  init(services, options) {
    this.services = services;
    this.options = options || getDefaults();
  }

  read(language, namespace, callback) {
    const filename = this.services.interpolator.interpolate(
      this.options.loadPath,
      { lng: language, ns: namespace }
    );

    readFile(filename, (err, resources) => {
      if (err) return callback(err, false);
      callback(null, resources);
    });
  }
}

Backend.type = 'backend';

export default Backend;
