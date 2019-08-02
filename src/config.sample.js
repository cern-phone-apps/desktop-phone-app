const dev = {
  api: {
    ENDPOINT: 'https://localhost:8080'
  },
  sentry: {
    DSN: 'https://ID@HOSTNAME/PROJECT'
  },
  piwik: {
    URL: 'https://blablabla.cern.ch',
    SITE_ID: 1
  }
};

const next = {
  api: {
    ENDPOINT: 'PRODUCTION_API_ENDPOINT'
  },
  sentry: {
    DSN: 'PRODUCTION_SENTRY_DSN'
  },
  piwik: {
    URL: 'PRODUCTION_PIWIK_URL',
    SITE_ID: 0
  }
};

const prod = {
  api: {
    ENDPOINT: 'PRODUCTION_API_ENDPOINT'
  },
  sentry: {
    DSN: 'PRODUCTION_SENTRY_DSN'
  },
  piwik: {
    URL: 'PRODUCTION_PIWIK_URL',
    SITE_ID: 0
  }
};

const test = {
  api: {
    ENDPOINT: 'http://localhost:7075'
  },
  sentry: {
    DSN: 'https://ID@HOSTNAME/PROJECT'
  },
  piwik: {
    URL: 'http://blablabla.cern.ch',
    SITE_ID: 1
  }
};

let tempConfig;
if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_NEXT) {
  tempConfig = next;
}
if (process.env.NODE_ENV === 'production' && !process.env.REACT_APP_NEXT) {
  tempConfig = prod;
}
if (process.env.NODE_ENV === 'development') {
  tempConfig = dev;
}
if (process.env.NODE_ENV === 'test') {
  tempConfig = test;
}
const config = tempConfig;

export default {
  // Add common config values here
  ...config
};
