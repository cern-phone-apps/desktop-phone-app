import { infoMessage } from "common/utils";

const EventEmitter = require("events");
export class DialNotifier extends EventEmitter {}

export class Dial {
  static _buildEvent(name, data) {
    return {
      name: name,
      data: data
    };
  }

  constructor(media) {
    this.media = media;
    this.dialNotifier = new DialNotifier();
  }

  static buildEvent(name, data, errorCode = 0, errorMsg = undefined) {
    let event = {
      name: name,
      data: data
    };
    if (errorCode) {
      event.error = {
        code: errorCode,
        description: errorMsg
      };
    }
    return event;
  }

  sendEvent(event) {
    this.dialNotifier.emit("ToneEvent", event);
    return event;
  }

  getNotifier() {
    return this.dialNotifier;
  }

  authenticate(user, token) {
    if (user && token) {
      const event = Dial.buildEvent("registered", {});

      setTimeout(() => {
        this.sendEvent(event);
      }, 300);
      return event;
    } else throw Error("Cannot authenticate. Token or User not set.");

  }

  call(callee) {
    if (!this.media) {
      throw Error("Cannot launch call. Media element not set.");
    }
    const event = Dial.buildEvent("accepted", {});

    setTimeout(() => {
      this.sendEvent(event);
    }, 300);
    return event;
  }

  hangUp() {
    const event = Dial.buildEvent("terminated", {});
    this.sendEvent(event);
    return event;
  }

  answer() {
    const event = Dial.buildEvent("Invite accepted", {});
    this.sendEvent(event);
    return event;
  }

  sendDTMF(tone) {
    infoMessage(`Sending DTMF message: ${tone}`);
    return tone;
  }

  stopAgent = () => {
    setTimeout(() => {
      const response = {};
      const cause = {};
      const event = Dial.buildEvent("unregistered", {}, cause, response);
      this.sendEvent(event);
    }, 300);
    return true;
  };
}
