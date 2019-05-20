# Dial Mobile

## Requirements

- Android 8.1
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

## Development

- Shake the phone to display the development menu.


## TONE JS API

Need to be placed on external/tone-webrtc-api/dial-api

### Change the debugger port

1. Open the development menu
2. On "Dev Settings" change the "Debug server 
host & port for device" to something like:
`localhost:8081`

### React Navigation

Maybe it is needed to link `react-native-gesture-handler`

```bash
react-native link react-native-gesture-handler
```

## Run the app

```bash
npm start
react-native run-android
```

