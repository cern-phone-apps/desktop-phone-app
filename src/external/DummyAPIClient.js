class DummyAPIClient {
  constructor (uaListener, sessionListener) {

  }
}

export default DummyAPIClient

export function initDial (uaListener, sessionListener) {
  return new DummyAPIClient(uaListener, sessionListener);
}
