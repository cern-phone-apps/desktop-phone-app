class DummyAPIClient {
  static _buildEvent (name, data) {
    return {
      'name': name,
      'data': data
    }
  }

  constructor (uaListener, sessionListener) {
    this.uaCallbackMethod = uaListener
    this.sessionCallbackMethod = sessionListener
  }

  startAgent = (user, password, disconnect) => {
    setTimeout(() => {
      if (disconnect) {
        this.uaCallbackMethod(DummyAPIClient._buildEvent('disconnected', null))
      } else {
        this.uaCallbackMethod(DummyAPIClient._buildEvent('connected', null))
      }
    }, 2000)
  }

  stopAgent = () => {
    setTimeout(() => {
      this.uaCallbackMethod(DummyAPIClient._buildEvent('disconnected', null))
    }, 2000)
  }
}

export default DummyAPIClient

export function initDial (uaListener, sessionListener) {
  console.debug('Creating a new DummyAPIClient')
  return new DummyAPIClient(uaListener, sessionListener)
}
