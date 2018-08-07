export class Dial {
  static _buildEvent (name, data) {
    return {
      'name': name,
      'data': data
    }
  }

  constructor (media) {
    this.media = media
    this.dialNotifier = new EventTarget()
  }

  static buildEvent (name, data, errorCode = 0, errorMsg = undefined) {
    let event = {
      'name': name,
      'data': data
    }
    if (errorCode) {
      event.error = {
        'code': errorCode,
        'description': errorMsg
      };
    }
    return event;
  }

  sendEvent (event) {
    const customEvent = new CustomEvent("ToneEvent", {detail: event});
    this.dialNotifier.dispatchEvent(customEvent);
  }

  getNotifier () {
    return this.dialNotifier;
  }

  authenticate (user, password) {
    if (user && password) {
      setTimeout(() => {
        const event = Dial.buildEvent('registered', {})
        this.sendEvent(event);
      }, 2000)
    }
    else throw Error("Cannot authenticate. Password or User not set.")
  }


  call (callee) {
    if (!this.media) {
      throw "Cannot launch call. Media element not set."
    }
    setTimeout(() => {
      const event = Dial.buildEvent('accepted', {})
      this.sendEvent(event)
    }, 2000)
  }

  hangUp () {
    const event = Dial.buildEvent('terminated', {})
    this.sendEvent(event)
  }

  stopAgent = () => {
    setTimeout(() => {
      const response = {}
      const cause = {}
      const event = Dial.buildEvent('unregistered', {}, cause, response)
      this.sendEvent(event)
    }, 2000)
  }
}
