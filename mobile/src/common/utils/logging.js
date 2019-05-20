import { AsyncStorage } from "react-native";

let debug = require("debug");

const clearLog = async () => {
  await AsyncStorage.setItem("logs", JSON.stringify([]));
};

const _retrieveData = async () => {
  let existingEntries;
  try {
    const value = await AsyncStorage.getItem("logs");
    if (value !== null) {
      // We have data!!
      // console.log(value);
      existingEntries = JSON.parse(value);
    } else {
      existingEntries = [];
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
  return existingEntries;
};

const addEntry = entry => {
  if (process.env.CI === true) {
    return;
  }
  let existingEntries = _retrieveData().then(async (existingEntries) => {
    try {
      JSON.stringify(entry);
    } catch (TypeError) {
      entry = simpleStringify(entry);
    }
    existingEntries.push(entry);

    try {
      await AsyncStorage.setItem("logs", JSON.stringify(existingEntries));
    } catch (error) {
      console.log(error);
      clearLog();
    }
  });
};

const simpleStringify = object => {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

clearLog();

(() => {
  //saving the original console.log function
  var preservedConsoleLog = console.log;

  //overriding console.log function
  console.log = function() {
    //we can't just call to `preservedConsoleLog` function,
    //that will throw an error (TypeError: Illegal invocation)
    //because we need the function to be inside the
    //scope of the `console` object so we going to use the
    //`apply` function
    var currentDate = "| " + new Date().toUTCString() + " ";
    preservedConsoleLog.apply(console, [...arguments, currentDate]);

    addEntry([...arguments, currentDate]);
  };
})();

/**
 * Initializes the different application's logs methods
 * @type {Function}
 */
let errorMessage = debug("APP:ERROR");
let warnMessage = debug("APP:WARN");
let infoMessage = debug("APP:INFO");
let logMessage = debug("APP:LOG");

let toneMessage = infoMessage.extend("TONE");
let toneInMessage = toneMessage.extend("TONE_IN");
let toneOutMessage = toneMessage.extend("TONE_OUT");

let actionMessage = infoMessage.extend("ACTION");

/**
 * On production, only error and info will be available.
 * On development and test, logMessage is also available
 */
if (process.env.NODE_ENV === "production") {
  debug.enable("APP:ERROR,APP:INFO,APP:INFO:*");
} else {
  debug.enable("APP:*");
}

export {
  errorMessage,
  warnMessage,
  infoMessage,
  logMessage,
  toneInMessage,
  toneOutMessage,
  actionMessage
};
