<div align="center">
  <img alt="icon" src="./assets/itunes.avif" width="64">
</div>

<h1 align="center"> 
  iTunes Clone
</h1>

<h3 align="center">
  🍎🎵🎧 an iTunes clone for iOS, Android, and the Web
</h3>

<br/>

<div align="center">
  <img alt="iPhone demo image" src="./assets/preview/ios.avif" width="200px">
  <img alt="Android-phone demo image" src="./assets/preview/android.avif" width="195px">
  <img alt="Web demo image" src="./assets/preview/desktop.avif" width="270px">
</div>

## System Prerequisites

Ensure you have the latest LTS (long-term support) version of [Node.js](https://nodejs.org/) installed on your system.

Recommended installation instructions are available [here](https://nodejs.org/en/download/package-manager).

**IMPORTANT NOTE**: Due to the dependencies included in this project, you _must_ use [EAS Build](https://docs.expo.dev/build/introduction/) to run this app on iOS and Android devices.

## Local Project Setup

Somewhere in your file system, run either

```bash
git clone https://github.com/pjnalls/itunes.git
```

if you aren't connect to GitHub with any SSH keys, **_or_**

```bash
git clone git@github.com:pjnalls/itunes.git
```

if you are.

Next, navigate to the root of the newly cloned project by running the following:

```bash
cd itunes/
```

Then, install a `node_modules` folder for all the project's dependencies:

```bash
npm i
```

## [EAS](https://docs.expo.dev/build/introduction/) Project Builds

Ensure the `eas-cli` is installed globally on your machine:

```bash
npm i -g eas-cli
```

Run the following command and follow the instructions in the CLI to create EAS builds for iOS (Apple Developer account needed) and Android:

```bash
eas build --profile development --platform all
```

Alternatively, you can build for a single platform at a time as builds may take some time to complete:

Run

```bash
eas build --profile development --platform ios
```

to create EAS builds for iOS only, and run

```bash
eas build --profile development --platform android
```

to create EAS builds for iOS only.

**IMPORTANT NOTE**: You'll need to install the new EAS development builds on your phone before you can run the Expo app locally, scan the app barcode to connect it, and run the React Native app from a physical iOS or Android device.

## Run iOS, Android, and/or Web Apps

Run the following to run the Expo app:

```bash
npm start
```

Then, if you have the EAS development builds installed on your phone, you should be able to scan the barcode that appears and run the React Native app from an iOS or and Android device.

Press `w` to open the web version of the React Native app in the browser.

**NOTE**: It's possible to run an iPhone, Android phone, and the browser on the same React Native app instance for cross-platform development. Also, simultaneous, universal HMR (Hot-module Replacement) has been enabled for this app.

## References

#### Helpful `react-native-track-player` Demo

[https://github.com/codezri/react-native-track-player-demo/](https://github.com/codezri/react-native-track-player-demo/)

#### #1 Helpful GitHub Comment for Building and Running This App

[https://github.com/doublesymmetry/react-native-track-player/issues/2227#issuecomment-2072231817](https://github.com/doublesymmetry/react-native-track-player/issues/2227#issuecomment-2072231817)

#### Another Helpful `react-native-track-player` Demo for iOS

[https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-1-ios-9552fea5178c](https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-1-ios-9552fea5178c)

#### Another Helpful `react-native-track-player` Demo for Android

[https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-2-android-8987e374f965](https://medium.com/@gionata.brunel/implementing-react-native-track-player-with-expo-including-lock-screen-part-2-android-8987e374f965)
