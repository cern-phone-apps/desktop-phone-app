class DummyAPIClient {
  constructor (uaListener, sessionListener) {
    this.uaCallbackMethod = uaListener
    this.sessionCallbackMethod = sessionListener
  }
}

export default DummyAPIClient

export function initDial (uaListener, sessionListener) {
  return new DummyAPIClient(uaListener, sessionListener);
}
